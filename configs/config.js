const _ = require('lodash');
require("dotenv").config();
let defaultConfig = {
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  SECRET_KEY:process.env.SECRET_KEY,
  ALGORITHM: process.env.ALGORITHM,
  DATABASE: process.env.MONGO_URL,
  REDIS_PORT:process.env.REDIS_PORT,
  REDIS_HOST:process.env.REDIS_HOST,
  DOMAIN:process.env.DOMAIN||`http://${process.env.HOST}:${process.env.PORT}`,
 
};
module.exports = _.merge(defaultConfig);