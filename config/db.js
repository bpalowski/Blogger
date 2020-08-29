const mongoose = require('mongoose')

const connect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONG_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true
    })
    console.log(`Connected :${connection.connection.host}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connect
