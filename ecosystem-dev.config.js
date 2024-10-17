module.exports = {
    apps : [{
      name   : "community-be-dev",
      script : "./server.js",
      exec_mode : "cluster", // default fork
      instances: 1, //"max",
      watch  : true,
      log_date_format : "YYYY-MM-DD HH:mm Z",
      env: {
        NODE_ENV: "dev",
        SECRET_KEY:"TI3@N_ADMLz",
        ALGORITHM:"aes-256-cbc",
        MONGO_URL:"mongodb://localhost:27017/community-dev?retryWrites=false",
        HOST:"localhost",
        PORT:"11001",
        REDIS_HOST:"localhost",
        REDIS_PORT:"6379",
      //   DOMAIN:"https://community-api-dev.edigitek.com",
     },
    }]
  }