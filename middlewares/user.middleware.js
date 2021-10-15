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
                    status: 401
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
                return next({
                    message: 'Wrong email or password',
                    status: 404
                });
            }

            req.body = value;
            next();
        } catch (e) {
            next(e)
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await User
                .findOne({email})
                .lean();

            if (!userByEmail) {
                return next({
                    message: 'Wrong email or password',
                    status: 404
                })
            }

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    }

};
