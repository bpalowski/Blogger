const router = require('express').Router()
const { checkAuth, checkGuest } = require('../middleware/auth')
const User = require('../models/User')








module.exports = router