const Joi = require('joi')
const { HttpCode } = require('../helpers/codes')

const schemaRegistration = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().alphanum().min(2).max(50).required(),
  subscription: Joi.string().optional(),
})

const schemaLogin = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().alphanum().min(2).max(50).required(),
})

const schemaChangeSubscription = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required()
})

const schemaVerification = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
})

const validate = (shema, body, next) => {
  const { error } = shema.validate(body)
  if (error) {
    const [{ message }] = error.details
    return next({
      status: HttpCode.BAD_REQUEST,
      message: `MISSING FIELDS: ${message}`
    })
  }
  next()
}

module.exports.validateRegistration = (req, res, next) => {
  return validate(schemaRegistration, req.body, next)
}

module.exports.validateLogin = (req, res, next) => {
  return validate(schemaLogin, req.body, next)
}

module.exports.validateChangeSubscription = (req, res, next) => {
  return validate(schemaChangeSubscription, req.body, next)
}

module.exports.validateVerification = (req, res, next) => {
  return validate(schemaVerification, req.body, next)
}
