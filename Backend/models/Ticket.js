const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ticketCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    slotTime: {
      type: String,
      required: [true, 'Please select a slot time (e.g. 09:00 AM - 10:00 AM)'],
    },
    date: {
      type: String,
      required: [true, 'Please select a date for the darshan'],
    },
    slotNumber: {
      type: Number,
      required: true,
    },
    pax: {
      type: Number,
      default: 1,
      min: 1,
      max: 10,
    },
    status: {
      type: String,
      enum: ['booked', 'checked_in', 'completed', 'cancelled'],
      default: 'booked',
    },
    qrCodeData: {
      type: String,
    },
    checkedInAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);
