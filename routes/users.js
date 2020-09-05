const router = require('express').Router()
const { checkAuth, checkGuest } = require('../middleware/auth')
const User = require('../models/User')



// All users for admin along with all blogs
// router.get('/users', checkAuth, async (req, res) => {
//   try {
//     const users = await User.find()
//     res.status(202).json({ users })
//   } catch (err) {
//     res.redirect("/error")
//   }
// })




module.exports = router