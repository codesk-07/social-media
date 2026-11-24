const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    'social_media',
    'root',
    'Password@123',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false
    }
);

module.exports = sequelize;