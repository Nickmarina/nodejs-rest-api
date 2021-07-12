const path = require('path')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

const UPLOAD_DIR = path.resolve('tmp')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR)
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split('.')
    cb(null, `${uuidv4()}.${extension}`)
  }
})

const uploadMiddleware = multer({ storage })

module.exports = { uploadMiddleware }
