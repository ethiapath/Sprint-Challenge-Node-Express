const express = require('express');

const projectRoutes = require('./Projects/projectsRoutes.js');
const actionRoutes = require('./Actions/actionsRoutes.js');

const router = express.Router();

router.use('/projects', projectRoutes)
router.use('/actions', actionRoutes)

module.exports = router;
