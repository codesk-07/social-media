const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Comment = sequelize.define('Comment', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    }

});

module.exports = Comment;                                                   