const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blogpost, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// presented with blogposts you have created
router.get('/', withAuth, async (req, res) => {
    Blogpost.findAll({
        where: { user_id: req.session.user_id },
        attributes: ['id', 'title', 'date', 'content'],
        include: [{
            model: Comment,
            attributes: ['id', 'comment', 'date', 'user_id', 'blogpost_id'],
            include: { model: User, attributes: ['username'] }
        },
        {
            model: User,
            attributes: ['username']
        }]
    })
    try {
        const blogpostData = await blogpostData.map(blogpost => blogpost.get({ plain: true }));
        res.render(('dashboard', { blogpostData, loggedIn: true }));
    }
    catch (err) {
        res.status(400).json(err)
    };
});

// add a blogpost
router.get('/new', (req, res) => {
    res.render('add-blogpost', {
        loggedIn: true
    });
});

// edit post on dashboard
router.get('/edit/:id', withAuth, async (req, res) => {
    Blogpost.findOne({
        where: { user_id: req.params.id },
        attributes: ['id', 'title', 'date', 'content'],
        include: [{
            model: Comment,
            attributes: ['id', 'comment', 'date', 'user_id', 'blogpost_id'],
            include: { model: User, attributes: ['username'] }
        },
        {
            model: User,
            attributes: ['username']
        }]
    })
    try {
        const blogpostData = await blogpostData.get({ plain: true });
        res.render(('edit-blogpost', { blogpostData, loggedIn: true }));
    }
    catch (err) {
        res.status(400).json(err)
    };
});


// WHEN I click on the button to add a new blog post
// THEN I am prompted to enter both a title and contents for my blog post
// WHEN I click on the button to create a new blog post
// THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
// WHEN I click on one of my existing posts in the dashboard
// THEN I am able to delete or update my post and taken back to an updated dashboard