const router = require('express').Router()
const pass = require('passport')
const Admin = require('../models/Admin')
const User = require('../models/User')

const { checkAuth, checkGuest } = require('../middleware/auth')


router.get('/google', pass.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ]
}));

router.get('/google/callback', pass.authenticate('google', {
  failureRedirect: '/login',
}), async (req, res) => {
  const { email } = req.user.email;

  let admins = await Admin.findOne({ email: req.user.email })

  if (admins) {
    return res.redirect(`http://localhost:3000/login/#loginpassword`)
  }

  return res.redirect(`http://localhost:3000/login/#${res.statusCode}`)
});


router.get('/authlogin', checkAuth, (req, res) => {
  res.status(200).json({ session_status: true, admin: req.user.admin })
})

router.get('/userdata', checkAuth, (req, res) => {
  res.status(200).json({
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
    res.status(201).json({ admin_status: true })
  }
})

router.get('/logout', async (req, res) => {
  await User.findOneAndUpdate({ email: req.user.email }, { admin: false });
  req.logout()
  res.redirect('/')
})


module.exports = router