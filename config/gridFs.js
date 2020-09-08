// const crypto = require('crypto');
// const path = require('path');
// const GridFsStorage = require('multer-gridfs-storage');
// const GridStream = require('gridfs-stream')
// const mongoose = require('mongoose')


// exports.GridFSConection = async (conn) => {

//   await conn.on('error', console.error.bind(console, "Error connecting to db"));

//   let gfs;
//   await conn.once('open', () => {
//     console.error.bind(console, " connecting to db")
//     gfs = GridStream(conn.db, mongoose.mongo)
//     gfs.collection('uploads')
//   })
// }



