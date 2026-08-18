const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['sos', 'medical', 'security', 'lost_child', 'stampede_warning'],
      default: 'sos',
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
      address: {
        type: String,
      },
    },
    description: {
      type: String,
      default: 'Emergency SOS alert triggered by devotee',
    },
    status: {
      type: String,
      enum: ['active', 'acknowledged', 'resolved'],
      default: 'active',
    },
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    resolvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// GeoSpatial Indexing for location queries
alertSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Alert', alertSchema);
