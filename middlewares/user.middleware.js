const User = require('../dataBase/User');
const userValidator = require('../validators/user.validators');
const {ErrorHandler} = require("../errors/ErrorHandler");

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                return next({
                    message: "Email already exist",
                    status: 404
                });
            }

            next();
        } catch (e) {
            next(e)
        }
    },

    isUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler();
            }

            req.body = value;
            next();
        } catch (e) {
            next(e)
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const userByEmail = await User
                .findOne({email: req.body.email})
                .select('+password')
                .lean();

            if (!userByEmail) {
                throw new ErrorHandler('Wrong email or password', 418)
            }

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    }
};
