const router = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const Comment = require('../models/Comments')
const mongoose = require('mongoose')
const { checkAuth } = require('../middleware/auth')
const { multerBool } = require('../config/multer')
const multer = require('multer')
var fs = require('fs');
var path = require('path');
const moment = require('moment')
const Comments = require('../models/Comments')

const { sendDataBodyListener } = require('../socket')

const upload = multerBool(multer)


// Create Blog
router.post('/createblog', [checkAuth, upload.single('file')], async (req, res) => {

  try {
    const file = await req.file

    if (file) {

      const newImg = fs.readFileSync(req.file.path);
      const encImg = newImg.toString('base64');

      const blog = {
        user: req.user.id,
        userImage: req.user.image,
        displayName: req.user.displayName,
        title: req.body.title,
        catagory: req.body.catagory,
        bodyText: req.body.bodyText,
        image: Buffer.from(encImg, 'base64')
      }
      Blog.create(blog, (err, item) => {
        if (err) {
          res.status(500).json({ success_blog: false })
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
    const blogs = await Blog.find({ user: req.user.id }).sort({ 'createdAt': 'desc' })
    res.status(202).send(blogs)
  } catch (err) {
    res.redirect("/error")
  }
})

// Blog public 
router.get('/publicblogs', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).sort({ 'createdAt': 'desc' })

    if (blogs) {
      return res.status(200).json(blogs)
    }
  } catch (err) {
    res.redirect("/error")
  }
})

router.post('/editblog', [checkAuth, upload.single('file')], async (req, res) => {
  try {
    let file = await req.file
    if (file) {
      const newImg = fs.readFileSync(req.file.path);
      const encImg = newImg.toString('base64');
      Blog.findByIdAndUpdate(req.body.id,
        {
          title: req.body.title,
          bodyText: req.body.bodyText,
          image: Buffer.from(encImg, 'base64'),
          catagory: req.body.catagory
        }, (err, result) => {
          if (err) {
            return res.status(500).json({ success_blog: false })
          }
          return res.status(200).json({ success_blog: true })
        });
    } else {
      if (!file) {
        Blog.findByIdAndUpdate(req.body.id,
          {
            title: req.body.title,
            bodyText: req.body.bodyText,
            catagory: req.body.catagory
          }, (err, result) => {
            if (err) {
              return res.status(500).json({ success_blog: false })
            }
            return res.status(200).json({ success_blog: true })
          });
      }
    }
  } catch (err) {
    return res.status(500).json({ success_blog: false })
  }
})

router.post("/comment", checkAuth, async (req, res) => {

  try {
    let id = req.user._id
    let blogId = req.body._id
    let comment = req.body.comment
    const obj = {
      content: comment,
      postedBy: id,
      replys: [],
      avatar: req.user.image
    }

    Comment.create(obj, (err, item) => {
      if (err) {
        res.status(500).json({ success_blog: false })
      }
      else {
        Blog.updateOne({ _id: blogId },
          {
            $push: { comments: item }
          }, (err, result) => {
            if (err) {
              return res.status(500).json({ success_blog: false })
            }
            sendDataBodyListener(item)
            return res.status(200).json(result)
          }
        )
      }
    })

  } catch (err) {
    return res.status(500).json({ success_blog: false })
  }
})



router.get('/blogComments', async (req, res) => {
  try {
    const data = await req.query.comments
    let records;
    if (data) {
      records = await Comment.find().where('_id').in(data).sort({ 'createdAt': 'desc' }).exec();
    }
    return res.status(202).json(records)
  } catch (err) {
    console.log(err)
  }
})

router.get('/myComments', async (req, res) => {
  try {
    const id = await req.query.id
    let records;
    if (id) {

      let data = await Comment.find({ postedBy: id }).sort({ 'createdAt': 'desc' }).exec();
      records = await Blog.find().where('comments').in(data).sort({ 'createdAt': 'desc' }).exec();
    }
    return res.status(202).json(records)
  } catch (err) {
    console.log(err)
  }
})


router.post('/editcomment', checkAuth, async (req, res) => {
  try {
    const _id = await req.body.id
    if (_id) {
      return await Comment.findByIdAndUpdate(req.body.id, {
        content: req.body.comment
      }, (err, result) => {
        if (err) {

          return res.status(500).json({ edit_success: false })
        }

        return res.status(200).json({ edit_success: true })
      })
    }
  } catch (err) {
    console.log(err)
  }
})


router.delete('/deletecomment', checkAuth, (req, res) => {
  try {

    Blog.updateOne({ _id: req.query.blogId },
      {
        $pull: { comments: req.query.id }
      },
      function (err, model) {
        if (err) {

          return res.send(err)
        }
        Comment.findByIdAndDelete(req.query.id, (err, docs) => {
          if (err) {
            return res.status(500).json({ success_delete: false })
          }
          return res.status(202).json({ success_delete: 'deleted-complete' })
        })
      })
  } catch (err) {
    res.redirect("/error")
  }
})





// // delete blog
router.delete('/deleteblog', checkAuth, async (req, res) => {
  try {
    let id = req.query.id;
    Blog.findByIdAndDelete(id, (err, docs) => {
      if (err) {
        return res.status(500).json({ success_delete: false })
      }
      return res.status(202).json({ success_delete: 'deleted-complete' })
    })
  } catch (err) {
    res.redirect("/error")
  }
})




module.exports = router