const dayJs = require('dayjs');
const {calculatePrice} = require('../util/booking.util');
const {Booking, Apartment, User} = require('../dataBase');
const {emailService} = require('../service');
const {CREATED, USER_DELETE} = require('../errors');
const {REFUSE_TO_RENT} = require('../configs');
const {RESERVED} = require('../configs/email-action.enum');

module.exports = {
    createBooking: async (req, res, next) => {
        try {
            const {apartment_id} = req.params;

            const {check_in, check_out} = req.body;

            const {user_id: apartmentUserId, price: apartmentPrice, approve} = req.apartment;

            const {email: userEmail, _id: user_id} = req.user;

            const booking_start = dayJs(check_in)
                .valueOf();
            const booking_end = dayJs(check_out)
                .valueOf();

            const price = calculatePrice(check_in, check_out, apartmentPrice);

            const {email: apartmentEmail, name: userName} = await User.findOne({_id: apartmentUserId});

            if (approve) {
                const reservedApartment = await Booking.create({
                    user_id,
                    apartment_id,
                    booking_start,
                    booking_end,
                    price,
                    isActive: false
                });

                await emailService.sendMail(apartmentEmail,
                    emailActionsEnum.RESERVED,
                    {
                        userName,
                        check_in,
                        check_out,
                        viewProfile: `${config.LOCALHOST_5000}users/${user_id}`
                    });
                await emailService.sendMail(userEmail, RESERVED);

                res.json(reservedApartment);

                return;
            }

            const reservedApartment = await Booking.create({user_id, apartment_id, booking_start,
                booking_end, price});

            res.json(reservedApartment);
        } catch (e) {
            next(e);
        }
    },

    updateBooking: async (req, res, next) => {
        try {
            const {check_in, check_out} = req.body;
            const {apartment_id, _id} = req.booking;

            const booking_start = dayJs(check_in)
                .valueOf();
            const booking_end = dayJs(check_out)
                .valueOf();

            const apartment = await Apartment.findOne({apartment_id});


            const booking_start1 = dayJs(check_in);
            const booking_end1 = dayJs(check_out);

            const numberOfDays = booking_end1.diff(booking_start1, 'day');

            const price = numberOfDays * apartment.price;

            const reservedApartment = await Booking.findByIdAndUpdate({_id}, {
                booking_start,
                booking_end,
                price
            }, {new: true});

            res.json(reservedApartment)
                .status(CREATED.status);
        } catch (e) {
            next(e);
        }
    },

    approveBooking: (req, res, next) => {
        try {
            const {booking_id: _id} = req.params;
            const reservedApartment = Booking.findByIdAndUpdate({_id}, {isActive: true}, {new: true});

            res.json(reservedApartment);
        } catch (e) {
            next(e);
        }
    },

    refuseBooking: async (req, res, next) => {
        try {
            const {booking_id: _id} = req.params;
            const {user_id} = Booking.findByIdAndDelete(_id);

            const {userEmail} = Apartment.findOne({_id: user_id});

            await emailService.sendMail(userEmail, REFUSE_TO_RENT.status);

            res.sendStatus(USER_DELETE.message);
        } catch (e) {
            next(e);
        }
    },

    getAllBookings: async (req, res, next) => {
        try {
            const {_id: apartment_id} = req.apartment;

            const reservedApartments = await Booking.find({apartment_id, isActive: true});

            res.json(reservedApartments);

        } catch (e) {
            next(e);
        }
    },

    getBookingById: (req, res, next) => {
        try {
            const booking = req.booking;

            res.json(booking);
        } catch (e) {
            next(e);
        }
    },

    deleteBooking: async (req, res, next) => {
        try {
            const {_id} = req.booking;

            await Booking.findByIdAndDelete({_id});

            res.sendStatus(USER_DELETE.status);

        } catch (e) {
            next(e);
        }
    }
};

