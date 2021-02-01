const Sequelize = require('sequelize')
const path = require('path')
const env = 'development'
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env]

const db = new Sequelize(
    config.database,
    config.username,
    config.password,
    {host: config.host, dialect: config.dialect}
);

module.exports = db;
