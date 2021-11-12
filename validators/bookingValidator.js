const Joi = require('joi');

const bookingValidator = Joi.object({
    check_in: Joi
        .date()
        .required(),
    check_out: Joi
        .date()
        .greater(Joi.ref('check_in'))
        .disallow(Joi.ref('check_in'))
        .required()
});

module.exports = {bookingValidator};
