const router = require('express')
    .Router();

const {apartmentController} = require('../controllers');
const {apartmentMiddleware, userByIdMiddleware, authMiddleware} = require('../middlewares');

router.post(
    '/:user_id',
    authMiddleware.checkAccessToken,
    userByIdMiddleware.checkIdMiddleware,
    apartmentMiddleware.isApartmentBodyValid,
    apartmentController.createApartment
);

router.get(
    '/',
    apartmentController.getApartments
);

router.get(
    '/:apartment_id',
    authMiddleware.checkAccessToken,
    apartmentMiddleware.checkApartmentIdMiddleware,
    apartmentController.getApartmentById);

router.delete('/:apartment_id',
    apartmentMiddleware.checkApartmentIdMiddleware,
    authMiddleware.checkAccessToken,
    apartmentController.deleteApartment);

router.put(
    '/:apartment_id',
    authMiddleware.checkAccessToken,
    apartmentMiddleware.checkApartmentIdMiddleware,
    apartmentMiddleware.isApartmentBodyValid,
    apartmentController.updateApartment);

module.exports = router;
