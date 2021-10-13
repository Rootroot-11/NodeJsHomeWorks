const User = require('../dataBase/User');
const { authValid } = require('../validators/auth.validators');

module.exports = {
    // isAuthenticationValid: (req, res, next) => {
    //     try {
    //         const {error, value} = authValid.validate(req.body.email);
    //
    //         if (error) {
    //             throw new Error('Wrong email or password');
    //         }
    //
    //         req.body = value;
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // },

    loginUserMiddleware: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const userFound = await User.findOne({ email });

            if (!userFound) {
                throw new Error('Wrong email or password');
            }

            req.user = userFound;
            next();
        } catch (e) {
            next(e);
        }
    }

};