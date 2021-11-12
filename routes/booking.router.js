const router = require('express').Router();
const {bookingController} = require('../controllers');
const {authMiddleware, bookingMiddleware, apartmentMiddleware} = require('../middlewares');

router.post('/:apartment_id',
    authMiddleware.checkAccessToken,
    bookingMiddleware.isBookingBodyValid,
    apartmentMiddleware.checkApartmentIdMiddleware,
    bookingMiddleware.isBookingDateFree(),
    bookingController.createBooking);

router.put('/:booking_id/approve',
    bookingMiddleware.checkBookingIdMiddleware,
    authMiddleware.checkAccessToken);

router.put('/:booking_id/refuse',
    bookingMiddleware.checkBookingIdMiddleware,
    authMiddleware.checkAccessToken);

router.put('/:booking_id',
    authMiddleware.checkAccessToken,
    bookingMiddleware.isBookingBodyValid,
    bookingController.updateBooking);

router.get('/all/:apartment_id',
    apartmentMiddleware.checkApartmentIdMiddleware,
    bookingController.getAllBookings);

router.get(
    '/:booking_id',
    bookingMiddleware.checkBookingIdMiddleware,
    bookingController.getBookingById);

router.delete('/:booking_id',
    authMiddleware.checkAccessToken,
    bookingController.deleteBooking);

module.exports = router;
