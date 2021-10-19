const {authValidator} = require('../validators');
const {ErrorHandler, NOT_VALID_BODY} = require('../errors');
const {passwordService} = require('../service');

module.exports = {
    isUserBodyValid: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const {error} = await authValidator.authValid.validate({email, password});

            if (error) {
                throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.status);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isPasswordsMatched: async (req, res, next) => {
        try {
            const { password } = req.body;
            const { password: hashPassword } = req.user;

            await passwordService.compare(password, hashPassword);

            next();
        } catch (e) {
            next(e);
        }
    }

};
