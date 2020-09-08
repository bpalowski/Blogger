const router = require('express').Router()
const Blog = require('../models/Blog')
const { checkAuth } = require('../middleware/auth')
const { multerBool } = require('../config/multer')
const multer = require('multer')
var fs = require('fs');
var path = require('path');
// const DIR = 'assets/';
// const { v4: uuidv4 } = require('uuid');
// const GridFsStorage = require('multer-gridfs-storage')
// const GridStream = require('gridfs-stream')
// const crypto = require('crypto');
const upload = multerBool(multer)
// const storagefs = require('../config/gridFs')




// storagefs(process.env.process.env.MONG_URI,req.file)


// const uploadClass = multer(storage)

// const gridFSUpload = require('../config/gridFs')



router.post('/createblog', [checkAuth, upload.single('file')], async (req, res) => {
  // console.log(req.body)
  try {
    const file = await req.file

    if (file) {
      const newImg = fs.readFileSync(req.file.path);
      const encImg = newImg.toString('base64');

      const blog = {
        user: req.user.id,
        displayName: req.user.displayName,
        title: req.body.title,
        catagory: req.body.selected,
        bodyText: req.body.bodyText,
        image: Buffer.from(encImg, 'base64')
      }
      Blog.create(blog, (err, item) => {
        if (err) {
          console.log(err);
        }
        else {
          item.save();
          res.status(200).json({ success_blog: true })
        }
      })
    }
  } catch (err) {
    res.status(200).json({ success_blog: false })
  }
})





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