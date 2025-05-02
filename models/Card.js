const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const List = require('./List');

const Card = sequelize.define('Card', {
    name: { type: DataTypes.STRING, allowNull: false }
})

// Association: Card belongs to List
Card.belongsTo(List, { foreignKey: 'listId' });
List.hasMany(Card, { foreignKey: 'listId' });


module.exports = Card;
