const Joi = require('joi');

const {EMAIL_REGEX, PASSWORD_REGEX} = require('../configs');

const authValidator = Joi.object({
    email: Joi.string()
        .trim()
        .regex(EMAIL_REGEX)
        .required(),

    password: Joi.string()
        .min(5)
        .max(28)
        .trim()
        .required()
        .regex(PASSWORD_REGEX)
});

module.exports = {authValidator};
