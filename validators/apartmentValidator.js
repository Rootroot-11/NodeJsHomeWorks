const Joi = require('joi');

const apartmentTypeEnum = require('../configs/apartment_type.enum');

const apartmentValidator = Joi.object({
    country: Joi
        .string()
        .alphanum()
        .min(2)
        .max(25)
        .required(),
    city: Joi
        .string()
        .alphanum()
        .min(2)
        .max(25)
        .required(),
    type: Joi
        .string()
        .allow(...Object.values(apartmentTypeEnum))
        .required(),
    amount_places: Joi
        .number()
        .required(),
    price: Joi
        .number()
        .required(),
    apartment_squaring: Joi
        .number()
        .required(),
    description: Joi
        .string()
        .required()
});

module.exports = {
    apartmentValidator
};
