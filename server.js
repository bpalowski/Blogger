const express = require('express')
const app = express()

const dotenv = require('dotenv')
const morgan = require('morgan')

const blog = require('./routes/blog')

// env
dotenv.config({ path: './config/config.env' })
//db
const db = require('./config/db')
db()

// Morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'))
}

// middle
app.use('/blog', blog)

// server
const PORT = process.env.PORT || 8080
app.listen(PORT, console.log(`Listening to ${PORT} on ${process.env.NODE_ENV} enviroment `))