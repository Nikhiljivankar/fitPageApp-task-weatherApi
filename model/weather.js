const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  data: {
    // we can define  the structure of this object what actual data we need it from  openweathermap API
    type: Object,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  }
},
{
  timestamps: { createdAt: true, updatedAt: true },
});

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
