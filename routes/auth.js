const router = require('express').Router()
const pass = require('passport')

const { checkAuth, checkGuest } = require('../middleware/auth')


router.get('/google', pass.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', pass.authenticate('google', {
  failureRedirect: '/login',
}), (req, res) => {
  res.redirect(`http://localhost:3000/login/#${res.statusCode}`)
});


router.get('/authlogin', checkAuth, (req, res) => {
  res.status(200).json({ session_status: true })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})


module.exports = router