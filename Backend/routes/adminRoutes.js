const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAlerts,
  triggerAlert,
  updateAlertStatus,
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Trigger emergency alert (Available to logged in users)
router.post('/alerts', protect, triggerAlert);

// Admin / Staff protected endpoints
router.get('/stats', protect, adminOnly, getDashboardStats);
router.get('/alerts', protect, adminOnly, getAlerts);
router.put('/alerts/:id', protect, adminOnly, updateAlertStatus);

module.exports = router;
