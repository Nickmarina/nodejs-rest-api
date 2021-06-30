const { HttpCode } = require('../helpers/codes.js')
const { registration, login, logout, getCurrentUser } = require('../services/authService')

const registrationController = async(req, res, next) => {
  const { email, password } = req.body
  const { subscription } = await registration(email, password)
  res.status(HttpCode.CREATED).json({ user: { email, subscription }, status: 'registration is successful' })
}

const loginController = async(req, res, next) => {
  const { email, password } = req.body
  const { token, subscription } = await login(email, password)
  res.status(HttpCode.OK).json({ status: 'success', token, user: { email, subscription } })
}

const logoutController = async(req, res, next) => {
  const { _id } = req.user
  await logout(_id)
  res.status(HttpCode.NO_CONTENT).json({ status: 'no content' })
}

const getCurrentUserController = async (req, res, next) => {
  const token = req.token
  const { email, subscription } = await getCurrentUser(token)
  res.status(HttpCode.OK).json({ status: 'success', user: { email, subscription } })
}

module.exports = {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController
}
