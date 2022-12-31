const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all comments 
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({})
        res.json(commentData)
    } catch (err) {
        res.status(400).json(err)
    };
});

// create a comment
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment: req.body.comment,
            user_id: req.session.user_id,
            blogpost_id: req.body.blogpost_id
        })
        res.json(commentData)
    } catch (err) {
        res.status(400).json(err)
    };
});

// update a comment
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedComment = await Comment.update(
            { comment: req.body.comment },
            { where: { id: req.params.id } }
        );
        res.json(updatedComment);
    } catch (err) {
        res.status(400).json(err);
    };
});

// delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedComment = await Comment.destroy(
            { where: { id: req.params.id } }
        );
        res.json(deletedComment);
    } catch (err) {
        res.status(400).json(err);
    };
});


module.exports = router;