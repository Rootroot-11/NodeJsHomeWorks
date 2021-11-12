const Joi = require('joi');

const commentValidator = Joi.object({
    body: Joi
        .string()
        .min(10)
        .max(500)
        .required()
});

module.exports = {
    commentValidator
};

