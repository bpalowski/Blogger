const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  content: {
    type: String
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  replys: [{
    text: String,
    replier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  avatar: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Comment', CommentSchema)