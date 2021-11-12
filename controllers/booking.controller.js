const dayJs = require('dayjs');
const {calculatePrice} = require('../util');
const {User, Booking, Apartment} = require('../dataBase');
const {emailService} = require('../service');
const {APPROVE_TO_RESERVE, WAITING_FOR_CONFIRM, RESERVED, APARTMENT_RESERVED} = require('../configs/email-action.enum');
const {CREATED} = require('../errors');

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
                    APPROVE_TO_RESERVE,
                    {
                        userName,
                        check_in,
                        check_out,
                        viewProfile: `${config.LOCALHOST_5000}users/${user_id}`
                    });

                await emailService.sendMail(userEmail, WAITING_FOR_CONFIRM);

                res.json(reservedApartment, CREATED.status);

                return;
            }
            const reservedApartment = await Booking.create({user_id, apartment_id, booking_start, booking_end, price});
            await emailService.sendMail(userEmail, RESERVED);

            await emailService.sendMail(apartmentEmail, APARTMENT_RESERVED, {userName, check_in, check_out});

            res.json(reservedApartment, CREATED.status);
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

            const reservedApartment = await Booking.findByIdAndUpdate({_id}, {booking_start, booking_end, price}, {new: true});

            res.json(reservedApartment)
                .status(CREATED.status);
        } catch (e) {
            next(e);
        }
    },

    getAllBookings: async (req, res, next) => {
        try {
            const {_id: apartment_id} = req.apartment;

            const reservedApartments = await Booking.find({apartment_id, isActive: true});

            res.json(reservedApartments, CREATED.status);

        } catch (e) {
            next(e);
        }
    },

    getBookingById: (req, res, next) => {
        try {
            const booking = req.booking;

            res.json (booking, CREATED.status);
        } catch (e) {
            next(e);
        }
    },

    deleteBooking: (req, res, next) => {
        try{

        } catch (e) {
            next(e);
        }
    }
};

