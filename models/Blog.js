const mongoose = require('mongoose')



const BlogSchema = new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],

  displayName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  bodyText: {
    type: String,
    required: true
  },
  catagory: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
  },
  userImage: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model("Blog", BlogSchema)