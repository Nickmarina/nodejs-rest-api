const { HttpCode } = require('../helpers/codes.js')
const { verification, reVerification } = require('../services/verificationService')

const verificationController = async(req, res, next) => {
  const { verificationToken } = req.params
  await verification(verificationToken)
  res.status(HttpCode.OK).json({ status: 'Verification successful' })
}

const reVerificationController = async(req, res, next) => {
  const { email } = req.body
  await reVerification(email)
  res.status(HttpCode.OK).json({ status: 'Verification email sent' })
}

module.exports = {
  verificationController,
  reVerificationController
}
