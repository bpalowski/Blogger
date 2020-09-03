const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
  adminId: {
    type: String,

  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,

  },
})

module.exports = mongoose.model('Admin', AdminSchema)