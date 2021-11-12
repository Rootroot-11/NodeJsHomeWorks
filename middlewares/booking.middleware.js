const {ErrorHandler, ACCESS, BAD_REQUEST} = require('../errors');
const {Booking} = require('../dataBase');
const {bookingValidator} = require('../validators');

module.exports = {
    isUserHaveAccess: async (req, res, next) => {
        try {
            const {user_id, apartment_id} = req.params;

            const usersBooking = await Booking.findOne({
                user_id,
                apartment_id,
                booking_end: {$lt: Date.now()}
            });

            if (!usersBooking) {
                throw new ErrorHandler(ACCESS.message, ACCESS.status);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isBookingBodyValid: (req, res, next) => {
        try {
            const {error, value} = bookingValidator.bookingValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST.status);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
};
