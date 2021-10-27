const Joi = require('joi');

const newPasswordValidator = Joi.object({
    password: Joi.string()
        .min(5)
        .max(20)
        .trim()
        .required()
});

module.exports = { newPasswordValidator };
