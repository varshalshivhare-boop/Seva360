const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    reconnectStrategy: false,
  }
});

redisClient.on('connect', () => {
  console.log('[Redis Connected]: Cache client ready');
});

redisClient.on('error', (err) => {
  // Silent log in dev when Redis is not running locally
});

const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (error) {
    console.log('[Redis Note]: Local Redis not active. Backend using in-memory queue fallback.');
  }
};

module.exports = {
  redisClient,
  connectRedis,
};
