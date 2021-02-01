const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const flash = require('express-flash')
const cors = require('cors')
const authRouter = require('./routes/auth.routes')
const userRouter = require('./routes/user.routes')
const app = express()
const passport = require('passport')
const initializePassport = require('./services/passport.service')
initializePassport(passport)


app.use(cors({origin: ['http://localhost:3000'], credentials: true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(flash())


app.get('/', (req, res) => res.send('Welcome'))

const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {domain: 'localhost'}
});
app.use(expressSession);

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRouter)
app.use('/api/user', userRouter)

module.exports = app;
