const { validateBody, Joi } = require('express-joi-validations')

const login = validateBody(
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().optional().allow(''),
  }))
const register = validateBody(
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().optional().allow(''),
  }))
const updateCoin = validateBody(
  Joi.object({
    coin: Joi.number().required().integer().min(-10000000).max(100000000),
  }))
const updateExp = validateBody(
  Joi.object({
    exp: Joi.number().required().integer().min(-100000000).max(100000000),
  }))
const updateMoney = validateBody(
  Joi.object({
    money: Joi.number().required().integer().min(-100000000).max(0),
  }))

const update = validateBody(
  Joi.object({
    levelMapCurrent: Joi.number().integer().max(1000),
  }))


module.exports = {
  register,
  login,
  updateCoin,
  updateExp,
  updateMoney,
  update,
}

