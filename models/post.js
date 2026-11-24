const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = Post;