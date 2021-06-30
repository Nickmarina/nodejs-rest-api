const jwt = require('jsonwebtoken')
require('dotenv').config()
const { HttpCode } = require('./codes')

const authMiddleware = (req, res, next) => {
  const [, token] = req.headers.authorization.split(' ')
  if (!token) {
    next(res.status(HttpCode.UNAUTHORIZED).json({ status: 'Not authorized' }))
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET)
    req.token = token
    req.user = user
    next()
  } catch (err) {
    next(res.status(HttpCode.UNAUTHORIZED).json({ status: 'Not authorized' }))
  }
}

module.exports = { authMiddleware }
