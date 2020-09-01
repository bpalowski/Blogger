const router = require('express').Router()
const { checkAuth, checkGuest } = require('../middleware/auth')

// Login Auth
router.get('/', (req, res) => {
  console.log(req.isAuthenticated())
})


module.exports = router