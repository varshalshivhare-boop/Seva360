const express = require('express');
const router = express.Router();
const {
  bookTicket,
  getUserTickets,
  cancelTicket,
  verifyTicket,
} = require('../controllers/ticketController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/book', protect, bookTicket);
router.get('/my-tickets', protect, getUserTickets);
router.put('/cancel/:id', protect, cancelTicket);
router.post('/verify', protect, adminOnly, verifyTicket);

module.exports = router;
