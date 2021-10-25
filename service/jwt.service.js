const jwt = require('jsonwebtoken');

const {ACCESS, JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET} = require('../configs');
const {ErrorHandler, WRONG_TOKEN} = require('../errors');
const ActionTokenType = require('../configs/action-token-type.enum');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = ACCESS) => {
        try {
            const secret = tokenType === ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler('Invalid token', 401);
        }
    },

    generateActionToken: (actionTokenType) => {
        let secretWord;

        switch (actionTokenType) {
            case ActionTokenType.FORGOT_PASSWORD:
                secretWord = 'HELLO'; // TODO from config
                break;
            default:
                throw new ErrorHandler('Wrong token type', 500);
        }

        return jwt.sign({}, secretWord, {expiresIn: '24h'});
    },


    verifyActionToken: async (token, actionTokenType) => {
        try {
            let secret;

            switch (actionTokenType) {
                case ActionTokenType.FORGOT_PASSWORD:
                    secret = 'HELLO';
                    break;
                default:
                    throw new ErrorHandler(WRONG_TOKEN.message, WRONG_TOKEN.status);
            }

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(WRONG_TOKEN.message, WRONG_TOKEN.status);
        }
    },

};
