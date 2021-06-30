const jwt = require('jsonwebtoken')
require('dotenv').config()

const AuthMiddleware = (req, res, next) => {
  const [tokenType, token] = req.headers.authorization.split(' ')
  if (!token) {
    //   add NotAU..error
    next()
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET)
    req.token = token
    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = { AuthMiddleware }
