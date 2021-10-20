const authValidator = require('../validators/auth.validators');
const {ErrorHandler, WRONG_EMAIL_OR_PASSWORD} = require('../errors');
const {passwordService, jwtService} = require('../service');
const {AUTHORIZATION, REFRESH } = require("../configs");
const {O_Auth} = require('../dataBase');

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

            await jwtService.verifyToken(token);

            const tokenResponse = await O_Auth
                .findOne({ access_token: token })
                .populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler('Invalid token', 401);
            }

            req.user = tokenResponse.user_id;
            req.access_token = tokenResponse.access_token;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler('Invalid token', 401);
            }

            await jwtService.verifyToken(token, REFRESH);

            const tokenResponse = await O_Auth
                .findOne({ refresh_token: token })
                .populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler('Invalid token', 401);
            }

            await O_Auth.deleteOne({ refresh_token: token });

            req.user = tokenResponse.user_id;

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

