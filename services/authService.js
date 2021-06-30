const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../db/userModel')

const registration = async (email, password) => {
  const newUser = new User({
    email,
    password
  })
  await newUser.save()
}

const login = async(email, password) => {
  const user = await User.findOne({ email })
  console.log(user)
  if (!user) {
    // add NotAuthorizedError
  }
  if (!await bcrypt.compare(password, user.password)) {
    // add NotAuthorizedError
  }

  const id = user._id
  const token = jwt.sign({ _id: id }, process.env.JWT_SECRET)
  await User.findByIdAndUpdate(id, { $set: { token } }, { new: true })
  return token
}

const logout = async(id) => {
  const token = null
  await User.findByIdAndUpdate(id, { $set: { token } }, { new: true })
}

module.exports = {
  registration,
  login,
  logout
}
