const config = require( '../configs/config');
const Redis = require("ioredis");
const redis = new Redis({
    port: config.REDIS_PORT, // Redis port
    host: config.REDIS_HOST, // Redis host
  });

module.exports = {redis};