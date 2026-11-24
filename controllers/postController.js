
const Post = require('../models/post');

// Create Post
const createPost = async (req, res) => {
    try {
        const { imageUrl, description } = req.body;

        if (!imageUrl || !description) {
            return res.status(400).json({
                message: 'Image URL and description are required'
            });
        }

        const post = await Post.create({
            imageUrl,
            description
        });

        res.status(201).json({
            message: 'Post created successfully',
            post
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error creating post',
            error: error.message
        });
    }
};

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            message: 'Posts fetched successfully',
            posts
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error fetching posts',
            error: error.message
        });
    }
};



// Like a Post
const likePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({
        message: 'Post not found'
      });
    }

    await post.increment('likes');
    await post.reload();

    res.status(200).json({
      message: 'Post liked successfully',
      likes: post.likes
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error liking post',
      error: error.message
    });
  }
};


module.exports = {
    createPost,
    getAllPosts,
    likePost
}