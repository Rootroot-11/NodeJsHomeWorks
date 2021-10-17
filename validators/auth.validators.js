const joi = require('joi');

const {EMAIL_REGEXP, PASSWORD_REGEXP} = require('../configs/constans');

const authValidator = joi.object({
    email: joi
        .string()
        .regex(EMAIL_REGEXP)
        .trim()
        .required(),
    password: joi
        .string()
        .regex(PASSWORD_REGEXP)
        .required(),
});

module.exports = {authValidator};
