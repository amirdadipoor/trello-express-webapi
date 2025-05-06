const { DataTypes } = require('sequelize');
const sequelize = require('../old-db');

const List = sequelize.define('List', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = List;