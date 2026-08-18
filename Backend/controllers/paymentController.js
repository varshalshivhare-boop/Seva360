const Payment = require('../models/Payment');
const Ticket = require('../models/Ticket');

/**
 * @desc    Create Payment Order / Process Transaction
 * @route   POST /api/payment/process
 * @access  Private
 */
const processPayment = async (req, res, next) => {
  try {
    const { amount, sevaType, paymentMethod = 'upi', ticketId } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, error: 'Valid payment amount is required' });
    }

    // Generate unique transaction reference (e.g. TXN-S360-98765432)
    const transactionId = `TXN-S360-${Date.now().toString().slice(-6)}${Math.floor(1000 + Math.random() * 9000)}`;

    const payment = await Payment.create({
      user: req.user ? req.user.id : req.body.userId,
      ticket: ticketId || null,
      transactionId,
      amount,
      sevaType: sevaType || 'VIP Special Darshan',
      paymentMethod,
      status: 'completed',
      paidAt: new Date(),
    });

    // If linked to a ticket, update ticket payment status
    if (ticketId) {
      await Ticket.findByIdAndUpdate(ticketId, { isPaid: true, paymentId: payment._id });
    }

    res.status(201).json({
      success: true,
      message: 'Payment processed successfully',
      receipt: {
        transactionId: payment.transactionId,
        amount: payment.amount,
        currency: payment.currency,
        sevaType: payment.sevaType,
        paymentMethod: payment.paymentMethod,
        status: payment.status,
        paidAt: payment.paidAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user's payment history
 * @route   GET /api/payment/history
 * @access  Private
 */
const getPaymentHistory = async (req, res, next) => {
  try {
    const payments = await Payment.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  processPayment,
  getPaymentHistory,
};
