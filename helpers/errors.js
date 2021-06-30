const { HttpCode } = require('./codes')

class ConflictError extends Error {
  constructor(message) {
    super(message)
    this.status = HttpCode.CONFLICT
  }
}

class UnauthorizedError extends TypeError {
  constructor(message) {
    super(message)
    this.status = HttpCode.UNAUTHORIZED
  }
}

module.exports = {
  ConflictError,
  UnauthorizedError
}
