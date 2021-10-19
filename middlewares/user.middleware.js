const User = require('../dataBase/User');
const {userValidator} = require('../validators');
const {ErrorHandler, EMAIL_EXIST} = require('../errors');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new ErrorHandler(EMAIL_EXIST.message, EMAIL_EXIST.status);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);

            if (error) {
                return next(error.details[0].message);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await User
                .findOne({email})
                .lean();

            if (!userByEmail) {
                throw new ErrorHandler(EMAIL_EXIST.message, EMAIL_EXIST.status);
            }

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUpdateBodyValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.user = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }

};
