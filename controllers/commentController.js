const Comment = require('../models/comment');
const Post = require('../models/post');

// Add Comment
const addComment = async (req, res) => {
    try {
        const { comment } = req.body;
        const postId = req.params.id;

        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        if (!comment || !comment.trim()) {
            return res.status(400).json({
                message: 'Comment is required'
            });
        }

        const newComment = await Comment.create({
            comment,
            postId
        });

        res.status(201).json({
            message: 'Comment added successfully',
            newComment
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error adding comment',
            error: error.message
        });
    }
};

// Get all comments for a post
const getComments = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        const comments = await Comment.findAll({
            where: {
                postId: postId
            },
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            message: 'Comments fetched successfully',
            comments
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error fetching comments',
            error: error.message
        });
    }
};

module.exports = {
    addComment,
    getComments
}