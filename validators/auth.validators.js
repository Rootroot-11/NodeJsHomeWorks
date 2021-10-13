const Joi = require('joi');

const {EMAIL_REGEXP, PASSWORD_REGEXP} = require('../configs/constans');

const authValid = Joi.object({
    email: Joi
        .string()
        .regex(EMAIL_REGEXP)
        .required(),
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .required(),
});

module.exports = {authValid};
