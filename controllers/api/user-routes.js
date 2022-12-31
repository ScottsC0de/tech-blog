const router = require('express').Router();
const { Blogpost, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');
const session = require('express-session');

// get all users
router.get('/', async (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    try {
        const userData = await res.json(userData);
    }
    catch (err) {
        res.status(400).json(err)
    };
});

// get one user
router.get('/:id', async (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.params.id },
        include: [{ model: Blogpost, attributes: ['id', 'title', 'date', 'content'] },
        {
            model: Comment,
            attributes: ['id', 'comment', 'date'],
            include: { model: Blogpost, attributes: ['title'] }
        }]
    })
    try {
        const userData = await res.json(userData);
    }
    catch (err) {
        res.status(400).json(err)
    };
});

// add new user
router.post('/', async (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    try {
        const newUser = await req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;

            res.json(newUser);
        });
    }
    catch (err) {
        res.status(400).json(err)
    };
});

// user login route
router.post('/login', async (req, res) => {
    User.findOne({
        where: req.body.username
    })
    try {
        const correctPassword = newUser.checkPassword(req.body.password);
        if (!correctPassword) {
            res.status(400).json({ message: 'Password is incorrect' });
            return;
        };

        const newUser = await req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;

            res.json({ user: newUser, message: "Success! You're in." });
        });
    }
    catch (err) {
        res.status(400).json(err)
    };
});

// user logout route
router.post('/logout', async (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(400).end();
    }
});

// update a user
router.put('/:id', withAuth, async (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: { id: req.params.id }
    })
    try {
        const updatedUser = await res.json(updatedUser);
    }
    catch (err) {
        res.status(400).json(err)
    };
});

// delete a user
router.delete('/:id', withAuth, async (req, res) => {
    User.destroy({ where: { id: req.params.id } })
    try {
        const deletedUser = await res.json(deletedUser);
    }
    catch (err) {
        res.status(400).json(err)
    };
});

module.exports = router;