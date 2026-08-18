const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('connect', () => {
  console.log('[Redis Connected]: Cache client ready');
});

redisClient.on('error', (err) => {
  console.error('[Redis Client Error]:', err.message);
});

const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (error) {
    console.error('[Redis Connection Failed]: Cache system will run in memory fallback mode if required.', error.message);
  }
};

module.exports = {
  redisClient,
  connectRedis,
};
