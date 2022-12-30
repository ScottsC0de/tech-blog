const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blogpost, Comment, User } = require('../models');

// presented with existed blog posts that include the post title and date created
router.get('/', async (req, res) => {
    Blogpost.findAll({
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
        res.render(('homepage', { blogpost, loggedIn: true }));
    }
    catch (err) {
        res.status(400).json(err)
    };
});

// existing post
// presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
router.get('/post/:id', async (req, res) => {
    Blogpost.findOne({
        where: { id: req.params.id },
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
        res.render(('blogpost', { blogpost, loggedIn: req.session.loggedIn }));
    }
    catch (err) {
        res.status(400).json(err)
    };
});

// WHEN I enter a comment and click on the submit button while signed in
// THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created 

// render sign in page. if successful, go to home page
router.get('/signin', async (req, res) => {
    try {
        await req.session.loggedIn
        res.redirect('/');
        return;
    }
    catch
    { res.render('signin'); }
});

// render sign up page. if successful, go to home page
router.get('/signup', async (req, res) => {
    try {
        await req.session.loggedIn
        res.redirect('/');
        return;
    }
    catch
    { res.render('signup'); }
});

module.exports = router;