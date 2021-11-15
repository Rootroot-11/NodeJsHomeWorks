const {BAD_REQUEST, APARTMENT_NOT_EXIST} = require('../errors');
const ErrorHandler = require('../errors/ErrorHandler');
const {apartmentValidator} = require('../validators');
const Apartment = require('../dataBase/Apartment');

module.exports = {
    isApartmentBodyValid: (req, res, next) => {
        try {
            const {error, value} = apartmentValidator.apartmentValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST.message, BAD_REQUEST.status);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkApartmentIdMiddleware: async (req, res, next) => {
        try {
            const {apartment_id: _id} = req.params;
            const apartmentId = await Apartment.findById(_id);

            if (!apartmentId) {
                throw new ErrorHandler(APARTMENT_NOT_EXIST.message, APARTMENT_NOT_EXIST.status);
            }

            req.apartment = apartmentId;

            next();
        } catch (e) {
            next(e);
        }
    }

};
