const Router = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const tokenService = require('../services/token.service')
const passport = require('passport')
const router = new Router()

router.post(
    '/registration', async (req, res, next) => {
        const {email, name, password} = req.body
        const user = await User.findOne({where: {name: name}})
        if (user) {
            return res.status(400).json({message: 'User with this email already exist'})
        }
        const hashedPassword = await bcrypt.hash(password, 8)
        let userObj = new User({email, name, password: hashedPassword})
        await userObj.save()
        return res.status(201).json({message: 'User has been created successfully'})
    });

router.post('/login',
    async (req, res, next) => {
        try {
            passport.authenticate('local', async (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (info) {
                    return res.status(400).json(info);
                }
                const {password} = req.body
                const isMatch = await bcrypt.compare(password, user.password)
                if (!isMatch) {
                    return res.status(400).json({message: 'Incorrect password, try again'})
                }
                const token = await tokenService.create(user.name)
                res.status(200).cookie('token', token, {maxAge: 86400000, httpOnly: true}).json({
                    token: token, userInfo: {
                        createdAt: user.createdAt, email: user.email, id: user.id, name: user.name,
                    }
                })
            })(req, res, next);
        } catch (error) {
            res.status(400).json(error);
        }
    });

router.post(
    '/check',
    passport.authenticate('cookie', {session: false}),
    async (req, res, next) => {
        try {
            return res.status(200).json({status: true})
        } catch (error) {
            res.status(400).json(error);
        }
    });


module.exports = router