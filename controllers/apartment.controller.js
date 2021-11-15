const {Apartment} = require('../dataBase');
const {USER_DELETE} = require('../errors');

module.exports = {
    createApartment: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const apartment = await Apartment.create({...req.body, user_id});

            res.json(apartment);
        } catch (e) {
            next(e);
        }
    },

    getApartments: async (req, res, next) => {
        try {
            const apartments = await Apartment.find();

            res.json(apartments);
        } catch (e) {
            next(e);
        }
    },

    getApartmentById: (req, res, next) => {
        try {
            const {apartment} = req;

            res.json(apartment);

        } catch (e) {
            next(e);
        }
    },

    deleteApartment: (req, res, next) => {
        try {
            const {apartment_id} = req.params;

            Apartment.findByIdAndDelete(apartment_id);

            res.json(USER_DELETE.message, USER_DELETE.status);
        } catch (e) {
            next(e);
        }
    },

    updateApartment: async (req, res, next) => {
        try {
            const {apartment_id} = req.params;

            const newApartment = await Apartment.findByIdAndUpdate(apartment_id, req.body, {new: true})
                .lean();

            res.json(newApartment);
        } catch (e) {
            next(e);
        }
    }
};

