const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homepage-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/', apiRoutes);
router.use('/', homeRoutes);
router.use('/', dashboardRoutes);

module.exports = router;