const express = require('express')
const multer = require('multer')
const path = require('path')
const router = express.Router()
const { asyncWrapper } = require('../../helpers/apiHelper')
const { avatarController } = require('../../controllers/avatarController')
const AVATARS_DIR = path.join(__dirname, '.' + '.' + 'public' + 'avatars')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, AVATARS_DIR)
  },
  filename: (req, file, cb) => {
    const [filename, extension] = file.originalname.split('.')
    cb(null, `${filename}.${extension}`)
  }
})

const avatarMiddleware = multer({ storage })
router.post('/', avatarMiddleware, asyncWrapper(avatarController))

module.exports = router
