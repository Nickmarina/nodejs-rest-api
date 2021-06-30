const { HttpCode } = require('./codes')

class InvalidDataError extends Error {
  constructor(message) {
    super(message)
    this.status = HttpCode.BAD_REQUEST
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message)
    this.status = HttpCode.CONFLICT
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message)
    this.status = HttpCode.UNAUTHORIZED
  }
}

module.exports = {
  InvalidDataError,
  ConflictError,
  UnauthorizedError
}
