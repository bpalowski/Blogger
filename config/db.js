const mongoose = require('mongoose')
// const { GridFSConection } = require('../config/gridFs')

// const GridFsStorage = require('multer-gridfs-storage')
// const crypto = require('crypto');
// const path = require('path');
// const multer = require('multer')

const connect = async () => {
  try {

    await mongoose.connect(process.env.MONG_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    })
    // const conn = await mongoose.connection;
    // await GridFSConection(conn)


  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connect








