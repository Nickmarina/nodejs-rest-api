const { ConflictError, UnauthorizedError, VerificationError, BadRequestError } = require('./errors')
const { HttpCode } = require('./codes')
const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next)
  }
}

const errorHandler = (error, req, res, next) => {
  if (ConflictError || UnauthorizedError || VerificationError || BadRequestError) {
    return res.status(error.status).json({ message: error.message })
  }
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: error.message })
}

module.exports = { asyncWrapper, errorHandler }
