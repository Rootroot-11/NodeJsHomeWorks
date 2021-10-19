const authValidator = require('../validators/auth.validators');
const {ErrorHandler, WRONG_EMAIL_OR_PASSWORD} = require('../errors');
const {passwordService, jwtService} = require('../service');
const {AUTHORIZATION} = require("../configs/constans");

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

    isPasswordsMatched: async (req, res, next) => {
        try {
            const { password } = req.body;
            const { password: hashPassword } = req.user;

            console.log('___________________________');
            console.log(password);
            console.log('___________________________');

            await passwordService.compare(password, hashPassword);

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);


            if (!token) {
                throw new ErrorHandler('Invalid token', 401);
            }
            console.log(token);

            await jwtService.verifyToken(token);

            next();
        } catch (e) {
            next(e);
        }
    }

    // checkingRole: (roleArr = []) => (req, res, next) => {
    //     try {
    //         if (!roleArr.includes(req.body.role)) {
    //             throw new ErrorHandler(ACCESS.message, ACCESS.status);
    //         }
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // }

};

