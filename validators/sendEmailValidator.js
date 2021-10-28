const Joi = require('joi');
const {EMAIL_REGEXP} = require('../configs');

const emailValidator = Joi.object({
    email: Joi.string()
        .trim()
        .regex(EMAIL_REGEXP)
        .required()
});

module.exports = { emailValidator };
