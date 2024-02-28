const moment = require('moment');

const requestCounts = {};

function rateLimit(req, res, next) {
  const clientIP = req.ip;

  if (!requestCounts[clientIP]) {
    requestCounts[clientIP] = [];
  }

  const cutoffTime = moment().subtract(1, 'minute');
  requestCounts[clientIP] = requestCounts[clientIP].filter(time => moment(time) > cutoffTime);

  if (requestCounts[clientIP].length >= 10) {
    return res.status(429).send('Rate limit exceeded. Please try again later.');
  }

  requestCounts[clientIP].push(moment().toISOString());

  next();
}

module.exports = rateLimit;
