const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const List = require('./List');

const Card = sequelize.define('Card', {
    name: { type: DataTypes.STRING, allowNull: false }
})

// Association: Card belongs to List
Card.belongsTo(List, {
    foreignKey: {
        name : 'listId' ,
        allowNull: false
    },
    onDelete: 'CASCADE'
});
List.hasMany(Card, {
    foreignKey: {
        name: 'listId',
        allowNull: false
    }
});


module.exports = Card;
