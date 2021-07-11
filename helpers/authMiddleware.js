const jwt = require('jsonwebtoken')
require('dotenv').config()
const { UnauthorizedError } = require('./errors')
const { User } = require('../db/userModel')

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')
    if (!token) {
      next(new UnauthorizedError('Not authorized'))
    }

    const { _id } = jwt.decode(token[1], process.env.JWT_SECRET)

    const findedUser = await User.findOne({ _id })
    if (!findedUser || findedUser.token !== token[1]) {
      next(new UnauthorizedError('Not authorized'))
    }
    req.token = token[1]
    req.user = findedUser
    next()
  } catch (err) {
    next(new UnauthorizedError('Not authorized'))
  }
}

module.exports = { authMiddleware }
