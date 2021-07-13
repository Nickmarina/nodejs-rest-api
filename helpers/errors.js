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

class VerificationError extends Error {
  constructor(message) {
    super(message)
    this.status = HttpCode.NOT_FOUND
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.status = HttpCode.BAD_REQUEST
  }
}

module.exports = {
  ConflictError,
  UnauthorizedError,
  VerificationError,
  BadRequestError
}
