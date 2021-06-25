const Joi = require('joi')
const { HttpCode } = require('../helpers/codes')

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.string().min(8).max(15).pattern(/^[0-9]+$/, 'numbers').required(),
  favorite: Joi.boolean().optional()
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
  phone: Joi.string().min(8).max(15).pattern(/^[0-9]+$/, 'numbers').optional(),
  favorite: Joi.boolean().optional()
}).min(1)

const schemaUpdateStatus = Joi.object({
  favorite: Joi.boolean().required()
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

module.exports.validateCreateContact = (req, res, next) => {
  return validate(schemaCreateContact, req.body, next)
}

module.exports.validateUpdateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next)
}

module.exports.validateUpdateStatus = (req, res, next) => {
  return validate(schemaUpdateStatus, req.body, next)
}
