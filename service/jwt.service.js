const jwt = require('jsonwebtoken');
const {ErrorHandler} = require("../errors");

const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = require('../configs/config');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET,{ expiresIn:'30d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = 'access') => {
        try {
            const secret = tokenType === 'access' ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;
            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler('Invalid token', 401);
        }
    }
};
