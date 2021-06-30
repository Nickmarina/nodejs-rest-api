const jwt = require('jsonwebtoken')
require('dotenv').config()
const { UnauthorizedError } = require('./errors')

const authMiddleware = (req, res, next) => {
  const [, token] = req.headers.authorization.split(' ')
  if (!token) {
    next(new UnauthorizedError('Not authorized'))
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET)
    req.token = token
    req.user = user
    next()
  } catch (err) {
    next(new UnauthorizedError('Not authorized'))
  }
}

module.exports = { authMiddleware }
