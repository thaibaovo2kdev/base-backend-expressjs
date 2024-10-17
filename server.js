const server = require('./configs/app')();
const config = require('./configs/config');
server.create(config);
//start the server
server.start();