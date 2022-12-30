const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blogpost, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// get post for dashboard
router.get('/', withAuth, async (req, res) => {
    Blogpost.findAll({
        where: { user_id: req.session.user_id },
        attributes: ['id', 'title', 'date', 'content'],
        include: [{
            model: Comment,
            attributes: ['id', 'comment', 'date', 'user_id', 'blogpost_id'],
            include: { model: User, attributes: ['username'] }
        }]
    })
    try {
        const blogpostData = await blogpostData.map(blogpost => blogpost.get({ plain: true }));
        res.render(('dashboard', { posts, loggedIn: true }));
    }
    catch (err) {
        res.status(400).json(err)
    };
});

// edit post on dashboard
router.put('/edit/:id', withAuth, async (req, res) => { });
