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
const { verificationController, reVerificationController } = require('../../controllers/verificationController')
const { validateRegistration, validateLogin, validateChangeSubscription, validateVerification } = require('../../validation/users')
const { authMiddleware } = require('../../helpers/authMiddleware')
const { uploadMiddleware } = require('../../helpers/multer')

router.get('/current', authMiddleware, asyncWrapper(getCurrentUserController))
router.get('/verify/:verificationToken', asyncWrapper(verificationController))
router.post('/registration', validateRegistration, asyncWrapper(registrationController))
router.post('/login', validateLogin, asyncWrapper(loginController))
router.post('/logout', authMiddleware, asyncWrapper(logoutController))
router.post('/verify', validateVerification, asyncWrapper(reVerificationController))
router.patch('/', authMiddleware, validateChangeSubscription, asyncWrapper(changeSubscriptionController))
router.patch('/avatars', authMiddleware, uploadMiddleware.single('avatar'), asyncWrapper(updateAvatarsController))

module.exports = router
