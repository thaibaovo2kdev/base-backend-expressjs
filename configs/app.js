const express = require('express');
var path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const {initData} =require ('../inits/index.js');
const {initScheduler} =require ('../schedulers/index.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../apiDocs/swagger.js');

module.exports = function () {
  let server = express(),
    create,
    start;

  create = (config) => {
    let routes = require('../routes');
    // set all the server things
    server.set('ENV', config.NODE_ENV);
    server.set('PORT', config.PORT);
    server.set('HOST', config.HOST);
    // Limit Upload
    // server.use(express.limit('4M'));
    // Add middleware to parse the json
    // server.use(express.urlencoded({ extended: true }));
    server.use(express.json({ limit: '10kb' }));
    server.use(express.urlencoded({ limit: '10kb',extended: true  }));
    // Prevent Cross
    server.use(helmet());
    server.use(cors());
    server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    server.use(express.json());
    server.use("/public", express.static(path.join(path.dirname(require.main.filename), "..") + '/static'));
    //enables cors
    server.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      /* LẤY NGÔN NGỮ MẶC ĐỊNH */
      try {
        let lcode = req.params.lcode || req.query.lcode || req.body.lcode || 'en';
        req.headers.lcode = lcode;
      } catch (error) {
        console.log(error.message);
      }

      next();
    });

    //connect the DATABASE
    try {
      mongoose.connect(
        config.DATABASE,
        {
          useNewUrlParser: true,
          useCreateIndex: true,
          // useUnifiedTopology: true,
          reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
          reconnectInterval: 500,
        }
      );
      console.log(`[COMMUNTIY - MONGO] - ` + config.DATABASE)
    } catch (error) {
      console.error(error);
    }
    // Set up routes
    routes.init(server);
  };

  start = () => {
    const HOST = server.get('HOST')
    const PORT = server.get('PORT')
    server.listen(PORT, function () {
      console.log('[COMMINITY - API] http://' + HOST + ':' + PORT);
    
    });
     initData();
     initScheduler();
  };
  return {
    create: create,
    start: start,
  };
};

