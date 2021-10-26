const {AUTHORIZATION} = require('../configs/constans');
const tokenTypeEnum = require('../configs/token-type.enum');
const {jwtService} = require('../service');
const {ErrorHandler, BAD_REQUEST} = require('../errors');
const {O_Auth, ActionToken} = require('../dataBase');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(BAD_REQUEST.message, BAD_REQUEST.status);
            }

            await jwtService.verifyToken(token);

            const tokenResponse = await O_Auth.findOne({access_token: token});

            if (!tokenResponse) {
                throw new ErrorHandler(BAD_REQUEST.message, BAD_REQUEST.status);
            }

            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(BAD_REQUEST.message, BAD_REQUEST.status);
            }

            await jwtService.verifyToken(token, tokenTypeEnum.REFRESH);

            const tokenResponse = await O_Auth.findOne({refresh_token: token});

            if (!tokenResponse) {
                throw new ErrorHandler(BAD_REQUEST.message, BAD_REQUEST.status);
            }

            await O_Auth.deleteOne({refresh_token: token});

            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActionToken: (tokenType) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(BAD_REQUEST.message, BAD_REQUEST.status);
            }

            await jwtService.verifyActionToken(token, tokenType);

            const tokenResponse = await ActionToken.findOne({ token });

            if (!tokenResponse) {
                throw new ErrorHandler(BAD_REQUEST.message, BAD_REQUEST.status);
            }

            await ActionToken.deleteOne({ token });

            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    }

};
