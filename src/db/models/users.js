const { DataTypes } = require('sequelize');

const { sequelize } = require('../db');

const Users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // personal data
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        defaultValue: 'other',
        allowNull: false,
    },
    birthdate: {
        type: DataTypes.DATE,
        defaultValue: new Date('1970-01-01'),
        allowNull: false,
    },
});

module.exports = Users;
