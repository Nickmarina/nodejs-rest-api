const jwt = require('jsonwebtoken')
require('dotenv').config()
const { User } = require('../db/userModel')
const { ConflictError, UnauthorizedError } = require('../helpers/errors')

const registration = async (email, password) => {
  const newUser = new User({
    email,
    password
  })

  const user = await User.findOne({ email })
  if (user) {
    throw new ConflictError(`Email '${email}' is ussed`)
  }

  await newUser.save()
  return newUser
}

const login = async(email, password) => {
  const user = await User.findOne({ email })

  if (!user || !user.validPassword(password)) {
    throw new UnauthorizedError('Email or password is wrong')
  }

  const id = user._id
  const token = jwt.sign({ _id: id }, process.env.JWT_SECRET)
  await User.findByIdAndUpdate(id, { $set: { token } }, { new: true })
  return { token, subscription: user.subscription }
}

const logout = async(id) => {
  const newToken = null
  await User.findByIdAndUpdate(id, { $set: { token: newToken } }, { new: true })
}

const getCurrentUser = async(token) => {
  const user = await User.findOne({ token })
  return user
}

const changeSubscription = async(id, newSubscription)=>{
  const user = await User.findByIdAndUpdate(id, { $set: { subscription: newSubscription } }, { new: true })
  return user
}

module.exports = {
  registration,
  login,
  logout,
  getCurrentUser,
  changeSubscription
}
