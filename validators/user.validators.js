const Joi = require('joi');

const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../configs');
const userRoles = require('../configs/user-roles.enum');

const createUserValidator = Joi.object({
    user_name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(20)
        .trim()
        .required(),
    first_name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(20)
        .trim()
        .required(),
    last_name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(20)
        .trim()
        .required(),
    email: Joi
        .string()
        .regex(EMAIL_REGEXP)
        .trim()
        .required(),
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .required(),
    user_type: Joi
        .string().allow(...Object.values(userRoles))
        .required(),
});

const updateUserValidator = Joi.object({
    user_name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(20)
        .trim()
        .required(),
    first_name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(20)
        .trim()
        .required(),
    last_name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(20)
        .trim()
        .required(),
});

module.exports = {
    createUserValidator, updateUserValidator
};
