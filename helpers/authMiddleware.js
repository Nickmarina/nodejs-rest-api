const jwt = require('jsonwebtoken')
require('dotenv').config()
const { UnauthorizedError } = require('./errors')
// const { User } = require('../db/userModel')

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')
    if (!token) {
      next(new UnauthorizedError('Not authorized'))
    }
    const user = jwt.decode(token[1], process.env.JWT_SECRET)
    req.token = token[1]
    req.user = user

    // const id = user._id
    // const findedUser = User.findOne({id})
    // console.log(findedUser)

    next()
  } catch (err) {
    next(new UnauthorizedError('Not authorized'))
  }
}

module.exports = { authMiddleware }
