const router = require('express').Router()
const pass = require('passport')
const Admin = require('../models/Admin')
const User = require('../models/User')
const { BASE_URL } = require('../config/exports')
const { checkAuth, checkGuest } = require('../middleware/auth')


router.get('/google', pass.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ]
}));
//
router.get('/google/callback', pass.authenticate('google', {
  failureRedirect: 'http://blogggers.herokuapp.com/login',
  successRedirect: 'http://blogggers.herokuapp.com/',
}), async (req, res) => {
  return res.redirect('http://blogggers.herokuapp.com/')
});


router.get('/userdata', checkAuth, (req, res) => {
  res.status(200).json({
    id: req.user._id,
    email: req.user.email,
    displayName: req.user.displayName,
    image: req.user.image,
    admin: req.user.admin
  })
})

router.post('/admin', checkAuth, async (req, res) => {
  const credential = req.body.pass
  let admin = await Admin.findOne({ email: req.user.email }).exec()
  if (admin.password === credential) {
    await User.findOneAndUpdate({ email: req.user.email }, { admin: true });
    return res.status(201).json({ admin_status: true })
  }
})

router.get('/logout', async (req, res) => {
  req.logout()
  res.redirect('/')
})


module.exports = router