const Post = require('./post');
const Comment = require('./comment');

// One post can have many comments
Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

// One comment belongs to one post
Comment.belongsTo(Post, {
    foreignKey: 'postId'
});

module.exports = { Post, Comment };