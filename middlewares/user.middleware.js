const User = require('../dataBase/User');
const {userValidator} = require('../validators');
const {ErrorHandler, WRONG_EMAIL_OR_PASSWORD, EMAIL_EXIST, BAD_REQUEST, ACCESS} = require('../errors');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await User.findOne({ email });

            if (userByEmail) {
                throw new ErrorHandler(EMAIL_EXIST.message, EMAIL_EXIST.status);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const userByEmail = await User
                .findOne({ email: req.body.email })
                .select('+password');

            if (!userByEmail) {
                throw new ErrorHandler(WRONG_EMAIL_OR_PASSWORD.message, WRONG_EMAIL_OR_PASSWORD.status);
            }

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (req, res, next) => {
        try {
            const { error, value } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST.message, BAD_REQUEST.status);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUpdateBodyValid: (req, res, next) => {
        try {
            const { error, value } = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST.message, BAD_REQUEST.status);
            }

            req.user = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            if (!roleArr.includes(role)) {
                throw new ErrorHandler(ACCESS.message, ACCESS.status);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

};
