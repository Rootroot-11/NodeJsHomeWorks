const { authValidator } = require('../validators');
const { ErrorHandler, NOT_VALID_BODY, WRONG_EMAIL_OR_PASSWORD } = require('../errors');
const { passwordService } = require('../service');
const User = require("../dataBase/User");

module.exports = {
    isUserBodyValid: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const {error} = await authValidator.authValid.validate({email, password});

            if (error) {
                throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.status);
            }
            const userFound = await User.findOne({email});

            if (!userFound) {
                throw new ErrorHandler(WRONG_EMAIL_OR_PASSWORD.message, WRONG_EMAIL_OR_PASSWORD.status);
            }

            req.hashPassword = userFound.password;

            next();
        } catch (e) {
            next(e);
        }
    },

    loginUserMiddleware: async (req, res, next) => {
        try {

            const hashPassword = req.hashPassword;

            const {password} = req.body;
            await passwordService.compare(password, hashPassword);

            next();
        } catch (e) {
            next(e);
        }
    }

};
