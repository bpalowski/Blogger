const mongoose = require('mongoose')


const connect = async () => {
  try {

    await mongoose.connect(process.env.MONG_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    })



  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}


module.exports = connect








