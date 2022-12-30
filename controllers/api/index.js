const router = require('express').Router();

const blogPostRoutes = require('./blogpost-routes.js');
const commentRoutes = require('./comment-routes.js');
const userRoutes = require('./user-routes.js');

router.use('/blogposts', blogPostRoutes);
router.use('/comments', commentRoutes);
router.use('/users', userRoutes);

module.exports = router;