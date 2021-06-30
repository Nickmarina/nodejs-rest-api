const express = require('express')
const router = express.Router()
const { asyncWrapper } = require('../../helpers/apiHelper')
const { registrationController, loginController, logoutController, getCurrentUserController } = require('../../controllers/authController')
const { validateRegistration, validateLogin } = require('../../validation/users')
const { authMiddleware } = require('../../helpers/authMiddleware')

router.post('/registration', validateRegistration, asyncWrapper(registrationController))
router.post('/login', validateLogin, asyncWrapper(loginController))
router.post('/logout', authMiddleware, asyncWrapper(logoutController))
router.get('/current', authMiddleware, asyncWrapper(getCurrentUserController))

module.exports = router
