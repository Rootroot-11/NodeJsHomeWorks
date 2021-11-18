const {User} = require('../dataBase');
const {ErrorHandler, WRONG_EMAIL_OR_PASSWORD, EMAIL_EXIST, BAD_REQUEST,
    ACCESS, USERNAME_EXIST} = require('../errors');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email, user_name} = req.body;

            const userByEmail = await User.findOne({email}).select('-password');
            const userName = await User.findOne({user_name});

            if (userByEmail) {
                throw new ErrorHandler(EMAIL_EXIST.message, EMAIL_EXIST.status);
            }

            if (userName) {
                throw new ErrorHandler(USERNAME_EXIST.message, USERNAME_EXIST.status);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const userByEmail = await User
                .findOne({email: req.body.email})
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

    isBodyValid: (validator) => (req, res, next) => {
        try {
            const {error, value} = validator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST.message, BAD_REQUEST.status);
            }

            req.user = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const {role} = req.user;

            if (!roleArr.includes(role)) {
                throw new ErrorHandler(ACCESS.message, ACCESS.status);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

};
