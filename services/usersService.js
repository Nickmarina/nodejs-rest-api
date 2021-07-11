const jwt = require('jsonwebtoken')
const jimp = require('jimp')
const path = require('path')
const fs = require('fs/promises')
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

  if (!user || !await user.validPassword(password)) {
    throw new UnauthorizedError('Email or password is wrong')
  }

  const id = user._id
  const token = jwt.sign({ _id: id }, process.env.JWT_SECRET)
  await User.findByIdAndUpdate(id, { $set: { token } }, { new: true })
  return { token, subscription: user.subscription }
}

const logout = async(_id) => {
  await User.findByIdAndUpdate(_id, { $set: { token: null } })
}

const getCurrentUser = async(_id) => {
  const user = await User.findOne({ _id })
  return user
}

const changeSubscription = async(id, newSubscription) => {
  const user = await User.findByIdAndUpdate(id, { $set: { subscription: newSubscription } }, { new: true })
  return user
}

const updateAvatars = async(_id, file) => {
  // const IMG_DIR = path.join(process.cwd(), 'public', 'avatars')
  const img = await jimp.read(file.path)
  await img.autocrop().cover(250, 250, [jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE]).writeAsync(file.path)
  await fs.rename(file.path, path.join(process.env.IMG_DIR, file.filename))
  const newUrl = `${process.env.IMG_DIR}/${file.filename}`
  await User.findByIdAndUpdate(_id, { $set: { avatarURL: newUrl } }, { new: true })
}

module.exports = {
  registration,
  login,
  logout,
  getCurrentUser,
  changeSubscription,
  updateAvatars
}
