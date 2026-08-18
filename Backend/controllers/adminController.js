const Ticket = require('../models/Ticket');
const Alert = require('../models/Alert');
const User = require('../models/User');
const { broadcastSOSAlert } = require('../services/socketService');

/**
 * @desc    Get Dashboard Statistics Overview
 * @route   GET /api/admin/stats
 * @access  Private (Admin/Staff)
 */
const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'devotee' });
    const totalTickets = await Ticket.countDocuments();
    const checkedInTickets = await Ticket.countDocuments({ status: 'checked_in' });
    const activeAlerts = await Alert.countDocuments({ status: 'active' });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalTickets,
        checkedInTickets,
        activeAlerts,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get list of historical & active SOS alerts
 * @route   GET /api/admin/alerts
 * @access  Private (Admin/Staff)
 */
const getAlerts = async (req, res, next) => {
  try {
    const { status, type } = req.query;
    const query = {};

    if (status) query.status = status;
    if (type) query.type = type;

    const alerts = await Alert.find(query)
      .populate('user', 'name phone')
      .populate('resolvedBy', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: alerts.length,
      alerts,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Trigger/Report an SOS Alert (Devotee or System)
 * @route   POST /api/admin/alerts
 * @access  Private
 */
const triggerAlert = async (req, res, next) => {
  try {
    const { type = 'sos', latitude, longitude, description, address } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ success: false, error: 'Location coordinates (latitude, longitude) required' });
    }

    const alert = await Alert.create({
      user: req.user.id,
      type,
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
        address: address || 'Temple Premises',
      },
      description,
      status: 'active',
    });

    const populatedAlert = await alert.populate('user', 'name phone');

    // Broadcast emergency via real-time WebSocket
    broadcastSOSAlert(populatedAlert);

    res.status(201).json({
      success: true,
      message: 'SOS Alert triggered successfully. Response team notified.',
      alert: populatedAlert,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update SOS Alert Status (Acknowledge / Resolve)
 * @route   PUT /api/admin/alerts/:id
 * @access  Private (Admin/Staff)
 */
const updateAlertStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const alert = await Alert.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({ success: false, error: 'Alert not found' });
    }

    if (status) {
      alert.status = status;
      if (status === 'resolved') {
        alert.resolvedBy = req.user.id;
        alert.resolvedAt = new Date();
      }
    }

    await alert.save();

    res.status(200).json({
      success: true,
      message: `Alert marked as ${status}`,
      alert,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getAlerts,
  triggerAlert,
  updateAlertStatus,
};
