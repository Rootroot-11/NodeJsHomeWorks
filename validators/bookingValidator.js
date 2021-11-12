const Joi = require('joi');

const bookingValidator = Joi.object({
    check_in: Joi
        .date()
        .required(),
    check_out: Joi
        .date()
});

module.exports = {bookingValidator};
