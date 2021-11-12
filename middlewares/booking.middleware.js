const {ErrorHandler, ACCESS, BAD_REQUEST, USER_NOT_FOUND} = require('../errors');
const {Booking} = require('../dataBase');
const {bookingValidator} = require('../validators');
const {bookingUtil} = require('../util');

module.exports = {
    isBookingDateFree: (action = 'create') => (req, res, next) => {
        try {
            let apartment_id = null;

            if (action === 'create') {
                const {apartment_id: id} = req.params;

                apartment_id = id;
            }

            if (action === 'update') {
                const {apartment_id: id} = req.booking;

                apartment_id = id;
            }

            const {check_in, check_out} = req.body;

            const reservedApartment = Booking.find({apartment_id, isActive: true});

            if (reservedApartment) {
                bookingUtil.isDateNotReserved(reservedApartment, check_in, check_out);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

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
    },

    checkBookingIdMiddleware: (req, res, next) => {
        try {
            const {booking_id} = req.params;

            const bookingById = Booking.findOne({_id: booking_id});

            if (!bookingById) {
                throw new ErrorHandler(USER_NOT_FOUND.message, USER_NOT_FOUND.status);
            }

            req.booking = bookingById;

            next();
        } catch (e) {
            next(e);
        }
    }
};
