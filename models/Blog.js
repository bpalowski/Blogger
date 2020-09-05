const mongoose = require('mongoose')

const blogger = new mongoose.Schema({
  _id: { id: mongoose.Schema.Types.ObjectId },
  name: { type: String },
  timeStamp: { type: Number }

})
module.exports = mongoose.model("blogger", blogger);

const BlogSchema = new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // bloggerlist: {
  //   blogger: [blogger]
  // },
  // postedBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // },
  // lists: {
  //   list: [mongoose.Schema.Types.ObjectId],
  // },
  // comments: [{
  //   text: String,
  //   postedBy: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'User'
  //   }
  // }],
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'nonactive']
  },


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
  // image: {
  //   type: String
  // },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Blog', BlogSchema)