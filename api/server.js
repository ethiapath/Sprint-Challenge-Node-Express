const express = require('express');

const configureMiddleware = require('./middleware.js');
const routes = require('./routes.js')

const server = express();

// middleware
configureMiddleware(server);

server.use('/api', routes);

module.exports = server;