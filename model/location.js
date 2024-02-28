const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
},
{
  timestamps: { createdAt: true, updatedAt: true },
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
