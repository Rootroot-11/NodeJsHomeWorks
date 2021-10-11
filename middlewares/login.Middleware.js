const User = require('../dataBase/User');
const {authValid} = require('../validators/auth.validators');

module.exports = {
    isAuthenticationValid: (req, res, next) => {
        try {
            const {error, value} = authValid.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message)
        }
    },

    loginUserMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const userFound = await User.findOne({email, password});
            if (!userFound) {
                throw new Error('Your email or password is incorrect!');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }

};