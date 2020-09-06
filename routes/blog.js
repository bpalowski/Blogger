const router = require('express').Router()
const Blog = require('../models/Blog')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });
const { checkAuth } = require('../middleware/auth')

// Blog private 
router.get('/myblogs', checkAuth, async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.id })
    res.status(202).send(blogs)
  } catch (err) {
    res.redirect("/error")
  }
})

// Blog public 
router.get('/publicblogs', async (req, res, next) => {
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
router.post('/createblog', checkAuth, upload.single('file'), async (req, res) => {
  console.log(req.file)
  // if (req.file) {
  //   console.log(req.file)
  //   // const blog = {
  //   //   user: req.user.id,
  //   //   displayName: req.user.displayName,
  //   //   title: req.body.title,
  //   //   catagory: req.body.selected,
  //   //   bodyText: req.body.bodyText,
  //   //   image: '',
  //   // }

  //   // await Blog.create(blog)
  //   return res.status(200).json({ success_blog: true })
  // }



})

// // edit blog
// router.post('/editblog', checkAuth, async (req, res) => {
//   try {
//     const { title, bodyText } = req.body
//     req.body.user = req.user.id
//     await Blog(req.body)
//     res.status(202).json({ message: "Post Successful" })
//   } catch (err) {
//     res.redirect("/")
//   }

// })




// // delete blog
// router.post('/deleteblog', checkAuth, async (req, res) => {
//   try {
//     const { title, bodyText } = req.body
//     req.body.user = req.user.id
//     await Blog(req.body)
//     res.status(202).json({ message: "Post Successful" })
//   } catch (err) {
//     res.redirect("/error")
//   }

// })


module.exports = router