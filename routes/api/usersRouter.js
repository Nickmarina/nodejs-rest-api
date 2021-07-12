const express = require('express')
const router = express.Router()
const { asyncWrapper } = require('../../helpers/apiHelper')
const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  changeSubscriptionController,
  updateAvatarsController
} = require('../../controllers/usersController')
const { validateRegistration, validateLogin, validateChangeSubscription } = require('../../validation/users')
const { authMiddleware } = require('../../helpers/authMiddleware')
const { uploadMiddleware } = require('../../helpers/multer')

router.post('/registration', validateRegistration, asyncWrapper(registrationController))
router.post('/login', validateLogin, asyncWrapper(loginController))
router.post('/logout', authMiddleware, asyncWrapper(logoutController))
router.get('/current', authMiddleware, asyncWrapper(getCurrentUserController))
router.patch('/', authMiddleware, validateChangeSubscription, asyncWrapper(changeSubscriptionController))
router.patch('/avatars', authMiddleware, uploadMiddleware.single('avatar'), asyncWrapper(updateAvatarsController))

module.exports = router
