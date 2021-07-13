const sha256 = require('sha256')
const { User } = require('../db/userModel')
const { sendMail } = require('../helpers/sgMai')
const { VerificationError, BadRequestError } = require('../helpers/errors')

const verification = async(verifyToken) => {
  const user = await User.findOne({ verifyToken })
  console.log(user)
  if (!user) {
    throw new VerificationError('User not found')
  }
  await User.findByIdAndUpdate(user._id, { $set: { verifyToken: null, verify: true } }, { new: true })
}

const reVerification = async(email) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new VerificationError('Email is wrong')
  }
  if (user.verify === true) {
    throw new BadRequestError('Verification has already been passed')
  }
  const code = sha256(email + process.env.JWT_SECRET + 'new')
  await sendMail(email, code)
}

module.exports = {
  verification,
  reVerification
}
