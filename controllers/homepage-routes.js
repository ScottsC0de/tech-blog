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
router.post('/signup', async (req, res) => {

    User.create({
        username: req.body.username,
        password: req.body.password
    })
    try {
        const newUser = await req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;

            res.redirect('/');
            return;
        });
    }
    catch (err) {
        res.status(400).json(err)
    };
});

// get route for signup page
// { res.render('signup'); }

module.exports = router;