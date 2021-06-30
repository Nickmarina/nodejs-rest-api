const { HttpCode } = require('../helpers/codes.js')
const { registration, login, logout } = require('../services/authService')

const registrationController = async(req, res, next) => {
  const { email, password } = req.body
  const user = await registration(email, password)
  res.status(HttpCode.CREATED).json({ user, status: 'registration is successful' })
}
const loginController = async(req, res, next) => {
  const { email, password } = req.body
  const token = await login(email, password)
  res.status(HttpCode.OK).json({ status: 'success', token })
}
const logoutController = async(req, res, next) => {
  const { _id } = req.user
  await logout(_id)
  res.status(HttpCode.OK).json({ status: 'logout' })
}

module.exports = {
  registrationController,
  loginController,
  logoutController
}
