const express = require('express')
const router = express.Router()
const { asyncWrapper } = require('../../helpers/apiHelper')
const { registrationController, loginController, logoutController } = require('../../controllers/authController')
const { AuthMiddleware } = require('../../helpers/authMiddleware')

router.post('/registration', asyncWrapper(registrationController))
router.post('/login', asyncWrapper(loginController))
router.post('/logout', AuthMiddleware, asyncWrapper(logoutController))

module.exports = router
