const express = require('express')
const router = express.Router()
const { asyncWrapper } = require('../../helpers/apiHelper')
const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  changeSubscriptionController
} = require('../../controllers/authController')
const { validateRegistration, validateLogin, validateChangeSubscription} = require('../../validation/users')
const { authMiddleware } = require('../../helpers/authMiddleware')

router.post('/registration', validateRegistration, asyncWrapper(registrationController))
router.post('/login', validateLogin, asyncWrapper(loginController))
router.post('/logout', authMiddleware, asyncWrapper(logoutController))
router.get('/current', authMiddleware, asyncWrapper(getCurrentUserController))
router.patch('/', authMiddleware, validateChangeSubscription, asyncWrapper(changeSubscriptionController))

module.exports = router
