const User = require('../dataBase/User');
const authValidator = require('../validators/auth.validators');
const {compare} = require("../service/password.service");


module.exports = {
    isUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.authValid.validate(req.body);

            if (error) {
                throw new Error('Wrong hgfhgf');
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    loginUserMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const userFound = await User.findOne({email});
            if (!userFound) {
                throw new Error('Wrong email or password');
            }

            await compare(password, userFound.password);

            next();
        } catch (e) {
            res.json(e.message);
        }
    }

};