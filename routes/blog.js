const router = require('express').Router()
const { checkAuth, checkGuest } = require('../middleware/auth')
const Blog = require('../models/Blog')

// Blog private 
// router.get('/privateblogs', checkAuth, async (req, res) => {
//   try {
//     const blogs = await Blog.find({ userId: req.user.userId })
//     res.status(202).json({ blogs })
//   } catch (err) {
//     res.redirect("/error")
//   }
// })

// Blog public 
router.get('/publicblogs', async (req, res) => {
  try {
    const blogs = await Blog.find({})
    if (blogs) {
      res.status(202).send(blogs)
    }
  } catch (err) {
    res.redirect("/error")
  }
})

// Create Blog
router.post('/createblog', checkAuth, async (req, res) => {
  try {
    const blog = {
      user: req.user.id,
      displayName: req.user.displayName,
      title: req.body.title,
      bodyText: req.body.bodyText,
      image: '',
    }
    await Blog.create(blog)
    return res.status(200).json({ success_blog: true })
  } catch (err) {
    res.status(200).json({ success_blog: false })
  }
})

// edit blog
router.post('/editblog', checkAuth, async (req, res) => {
  try {
    const { title, bodyText } = req.body
    req.body.user = req.user.id
    await Blog(req.body)
    res.status(202).json({ message: "Post Successful" })
  } catch (err) {
    res.redirect("/")
  }

})




// delete blog
router.post('/deleteblog', checkAuth, async (req, res) => {
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