const LocalStrategy = require('passport-local').Strategy
const CookieStrategy = require('passport-cookie').Strategy;
const bcrypt = require('bcrypt')
const userTokentService = require('../services/token.service');
const User = require("../models/User")


function initialize(passport) {

    const authenticateUser = async (name, password, done) => {
        const user = await User.findOne({where: {name: name}})
        if (user === null) {
            return done(null, null, {message: 'No user with this email'})
        }
        try {
            if (await bcrypt.compare(password, user.dataValues.password)) {
                return done(null, user.dataValues)
            } else {
                return done(null, null, {message: 'Password incorrect'})
            }
        } catch (e) {
            return done(e)
        }
    }

    const authenticateUserCookie = async (token, done) => {
        const accessToken = await userTokentService.findUser(token);
        if (!accessToken.message && accessToken.isVerified === true) {
            const user = await User.findOne({where: {name: accessToken.userName}});
            if (user) {
                const info = {scope: '*'}
                done(null, user.dataValues, info);
            } else {
                return done(null, null);
            }
        } else {
            return done(null, null);
        }
    }

    passport.use('local', new LocalStrategy(
        {
            usernameField: 'name',
            passwordField: 'password',
        }, authenticateUser));

    passport.use('cookie', new CookieStrategy(authenticateUserCookie));

    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id, done) => {
        const user = await User.findOne({where: {id}})
        if (user) {
            return done(null, user.id)
        }
    })
}

module.exports = initialize
