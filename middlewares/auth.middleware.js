const User = require('../dataBase/User');
const authValidator = require('../validators/auth.validators');
const {ErrorHandler, WRONG_EMAIL_OR_PASSWORD, ACCESS} = require('../errors');
const {passwordService} = require('../service');

module.exports = {
    isUserBodyValid: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const {error} = await authValidator.authValidator.validate({email, password});

            if (error) {
                throw new ErrorHandler(WRONG_EMAIL_OR_PASSWORD.message, WRONG_EMAIL_OR_PASSWORD.status);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({email}).select('+password');

            if (!user) {
                throw new ErrorHandler(WRONG_EMAIL_OR_PASSWORD.status, WRONG_EMAIL_OR_PASSWORD.message);
            }

            await passwordService.compare(password, user.password);

            req.body = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkingRole: (roleArr = []) => (req, res, next) => {
        try {
            if (!roleArr.includes(req.body.role)) {
                throw new ErrorHandler(ACCESS.message, ACCESS.status);
            }
            next();
        } catch (e) {
            next(e);
        }
    }

};

