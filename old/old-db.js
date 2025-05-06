const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, 'database.db');

if (!fs.existsSync(path.dirname(dbPath))) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    logging: console.log  // ✅ This enables logging of SQL queries
});

module.exports = sequelize;