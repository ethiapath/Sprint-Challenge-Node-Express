const express = require('express');

const projectRoutes = require('./Projects/projectRoutes.js');
const actionRoutes = require('./Actions/actionRoutes.js');

const router = express.Router();

server.use('/projects', projectRoutes)
server.use('/actions', actionRoutes)

module.exports = router;
