const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  googleId: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  admin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', UserSchema)