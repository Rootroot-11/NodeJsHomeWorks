const router = require('express').Router();
const {bookingController} = require('../controllers');
const {authMiddleware, bookingMiddleware} = require('../middlewares');

router.post('/:apartment_id',
    authMiddleware.checkAccessToken,
    bookingMiddleware.isBookingBodyValid,
    bookingController.createBooking);

router.put('/:booking_id/approve',
    authMiddleware.checkAccessToken);

router.put('/:booking_id/refuse',
    authMiddleware.checkAccessToken);

router.put('/:booking_id',
    authMiddleware.checkAccessToken,
    bookingMiddleware.isBookingBodyValid,
    bookingController.updateBooking);

router.get('/all',
    bookingController.getAllBookings);

router.get('/:booking_id',
    bookingController.getBookingById);

router.delete('/:booking_id',
    authMiddleware.checkAccessToken,
    bookingController.deleteBooking);

module.exports = router;
