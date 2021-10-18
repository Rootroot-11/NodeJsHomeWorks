const {authValidator} = require('../validators');
const { ErrorHandler, NOT_VALID_BODY, WRONG_EMAIL_OR_PASSWORD } = require('../errors');
const User = require("../dataBase/User");

module.exports = {
    isUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.authValid.validate(req.body);

            if (error) {
                throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.status);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    loginUser: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userFound = await User.findOne({email});

            if (!userFound) {
                throw new ErrorHandler(WRONG_EMAIL_OR_PASSWORD.message, WRONG_EMAIL_OR_PASSWORD.status);
            }

            res.user = userFound;

            next();
        } catch (e) {
            next(e);
        }
    }

};
