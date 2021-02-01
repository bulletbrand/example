const Sequelize = require('sequelize')
const db = require('./database')

const modelName = 'Token'

const Token = db.define(modelName, {
    id: {
        type: Sequelize.CHAR,
        autoIncrement: false,
        primaryKey: true,
    },
    userName: {
        type: Sequelize.STRING,
    },
    isVerified: {
        type: Sequelize.BOOLEAN,
    },
    validDate: {
        type: Sequelize.DATE,
    }
})

module.exports = Token
