const Ticket = require('../models/Ticket');
const { redisClient } = require('../config/redis');
const { sendSMS } = require('../services/twilioService');
const { notifyQueueUpdate } = require('../services/socketService');

/**
 * @desc    Book Virtual Queue Ticket for Darshan
 * @route   POST /api/tickets/book
 * @access  Private
 */
const bookTicket = async (req, res, next) => {
  try {
    const { slotTime, date, pax = 1 } = req.body;

    if (!slotTime || !date) {
      return res.status(400).json({ success: false, error: 'Please specify slotTime and date' });
    }

    const redisKey = `slot_count:${date}:${slotTime}`;
    let currentSlotCount = 1;

    // Check Redis for slot availability / counter
    if (redisClient.isOpen) {
      const cachedCount = await redisClient.get(redisKey);
      if (cachedCount) {
        currentSlotCount = parseInt(cachedCount, 10) + 1;
      }
      await redisClient.set(redisKey, currentSlotCount.toString());
    } else {
      const countInDb = await Ticket.countDocuments({ date, slotTime });
      currentSlotCount = countInDb + 1;
    }

    // Generate Unique Ticket Code (e.g. S360-20260818-1002)
    const formattedDate = date.replace(/-/g, '');
    const ticketCode = `S360-${formattedDate}-${Math.floor(1000 + Math.random() * 9000)}`;

    const ticket = await Ticket.create({
      user: req.user.id,
      ticketCode,
      slotTime,
      date,
      slotNumber: currentSlotCount,
      pax,
      status: 'booked',
      qrCodeData: JSON.stringify({ ticketCode, date, slotTime, userId: req.user.id }),
    });

    // Send SMS Notification asynchronously
    if (req.user.phone) {
      const smsBody = `Namaste ${req.user.name}! Your Seva360 Darshan Ticket ${ticketCode} for ${date} (${slotTime}) is confirmed. Slot #${currentSlotCount}.`;
      sendSMS(req.user.phone, smsBody);
    }

    // Broadcast queue update via Socket.io
    notifyQueueUpdate({
      date,
      slotTime,
      totalBooked: currentSlotCount,
      latestTicketCode: ticketCode,
    });

    res.status(201).json({
      success: true,
      message: 'Ticket booked successfully',
      ticket,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all tickets of current logged in user
 * @route   GET /api/tickets/my-tickets
 * @access  Private
 */
const getUserTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Cancel a booked ticket
 * @route   PUT /api/tickets/cancel/:id
 * @access  Private
 */
const cancelTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, error: 'Ticket not found' });
    }

    // Check ownership
    if (ticket.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Not authorized to cancel this ticket' });
    }

    ticket.status = 'cancelled';
    await ticket.save();

    res.status(200).json({
      success: true,
      message: 'Ticket cancelled successfully',
      ticket,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Verify / Scan ticket at temple gate (Staff/Admin)
 * @route   POST /api/tickets/verify
 * @access  Private (Admin/Staff)
 */
const verifyTicket = async (req, res, next) => {
  try {
    const { ticketCode } = req.body;

    if (!ticketCode) {
      return res.status(400).json({ success: false, error: 'Ticket code is required for scanning' });
    }

    const ticket = await Ticket.findOne({ ticketCode }).populate('user', 'name phone email');

    if (!ticket) {
      return res.status(404).json({ success: false, error: 'Invalid Ticket Code' });
    }

    if (ticket.status === 'cancelled') {
      return res.status(400).json({ success: false, error: 'Ticket has been CANCELLED' });
    }

    if (ticket.status === 'completed' || ticket.status === 'checked_in') {
      return res.status(400).json({ success: false, error: `Ticket already ${ticket.status.toUpperCase()}` });
    }

    ticket.status = 'checked_in';
    ticket.checkedInAt = new Date();
    await ticket.save();

    res.status(200).json({
      success: true,
      message: 'Ticket Verified! Devotee permitted entry.',
      ticket,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  bookTicket,
  getUserTickets,
  cancelTicket,
  verifyTicket,
};
