const User = require('../dataBase/User');
const authValidator = require('../validators/auth.validators');
const passwordService = require('../service/password.service');

module.exports = {
    isUserBodyValid: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const {error} = await authValidator.authValidator.validate({email, password});

            if (error) {
                throw new Error('Wrong email or password');
            }
            const userFound = await User.findOne({email});

            if (!userFound) {
                throw new Error('Wrong email or password');
            }

            req.hashPassword = userFound.password;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    loginUserMiddleware: async (req, res, next) => {
        try {

            const hashPassword = req.hashPassword;

            const {password} = req.body;
            await passwordService.compare(password, hashPassword);

            next();
        } catch (e) {
            res.json(e.message);
        }
    }

};
