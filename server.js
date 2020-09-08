
const express = require('express')
const app = express()
const passport = require('passport')

const dotenv = require('dotenv')
const morgan = require('morgan')

const session = require('express-session')

const blog = require('./routes/blog')
const auth = require('./routes/auth')

const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')

const methodoveride = require('method-override')

const cors = require('cors')
require('dotenv').config()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodoveride('_method'))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
// Cors
app.use(cors())

// env
dotenv.config({ path: './config/config.env' })

// Morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'))
}

// express-session
app.use(session({
  secret: 'MrBig',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Passport middlewear
app.use(passport.initialize());
app.use(passport.session());

// passport
require('./config/passport')(passport)


//db
const db = require('./config/db')
db()

// route
app.use('/auth', auth)
app.use('/blog', blog)

// server
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Listening to ${PORT} on ${process.env.NODE_ENV} enviroment `))