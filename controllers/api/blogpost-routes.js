const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Blogpost, Comment, User } = require('../../models');
const User = require('../../models/User');
const withAuth = require('../../utils/auth');

// get all blog posts
router.get('/', async (req, res) => {
    Blogpost.findAll({
        attributes: ['id', 'title', 'date', 'content'],
        order: [['date', 'DESC']],
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
        const blogPostData = await res.json(blogPostData);
    }
    catch (err) {
        res.status(400).json(err)
    };
});

// get one blog post
router.get('/:id', async (req, res) => {
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
        const blogPostData = await res.json(blogPostData);
    }
    catch (err) {
        res.status(400).json(err)
    };
});

// create a blog post
router.post('/', withAuth, async (req, res) => {
    Blogpost.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
    try {
        const newBlogPost = await res.json(newBlogPost);
    }
    catch (err) {
        res.status(400).json(err)
    };
});

// update a blog post
router.put('/:id', withAuth, async (req, res) => {
    Blogpost.update({
        where: { id: req.params.id },
        title: req.body.title,
        content: req.body.content
    })
    try {
        const updatedBlogPost = await res.json(updatedBlogPost);
    }
    catch (err) {
        res.status(400).json(err)
    };
});

// delete a blog post
router.delete('/:id', withAuth, async (req, res) => {
    Blogpost.destroy({ where: { id: req.params.id } })
    try {
        const deletedBlogPost = await res.json(deletedBlogPost);
    }
    catch (err) {
        res.status(400).json(err)
    };
});

module.exports = router;