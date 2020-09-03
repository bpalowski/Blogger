const router = require('express').Router()
const { checkAuth, checkGuest } = require('../middleware/auth')
const Blog = require('../models/Blog')

// Login Auth
router.post('/createblog', checkAuth, async (req, res) => {
  try {
    const { title, bodyText } = req.body
    req.body.user = req.user.id
    await Blog(req.body)
    res.status(202).json({ message: "Post Successful" })
  } catch (err) {
    res.redirect("/error")
  }

})


module.exports = router