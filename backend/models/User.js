const Sequelize = require('sequelize')
const db = require('./database')

const modelName = 'User'

const User = db.define(modelName, {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
    },
    role: {
        type: Sequelize.STRING,
    },
    active: {
        type: Sequelize.BOOLEAN,
        default: true
    }
})

module.exports = User
