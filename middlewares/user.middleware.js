const User = require('../dataBase/User');
const userValidator = require('../validators/user.validators');
const { ErrorHandler, USER_NOT_FOUND } = require('../errors');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new ErrorHandler(USER_NOT_FOUND.message, USER_NOT_FOUND.status);
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
                throw new ErrorHandler(USER_NOT_FOUND.message,USER_NOT_FOUND.status);
            }

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    }

};
