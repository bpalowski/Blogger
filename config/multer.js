const { v4: uuidv4 } = require('uuid');

const multerMethod = (multer) => {
  const DIR = 'uploads/'
  return multer.diskStorage({

    destination: (req, file, cb) => {
      cb(null, DIR)
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuidv4() + '-' + fileName)
    }
  })
}


exports.multerBool = (multer) => {

  return multer({
    storage: multerMethod(multer), fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  });

}
