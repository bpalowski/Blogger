const router = require('express').Router()
const pass = require('passport')


router.get('/google', pass.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', pass.authenticate('google', {
  failureRedirect: '/login',
}), (req, res) => {
  res.redirect(`http://localhost:3000/login/#${res.statusCode}`)
});




module.exports = router