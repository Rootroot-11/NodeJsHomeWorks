const User = require('../dataBase/User');
const userValidator = require('../validators/user.validators');
const passwordService = require('../service/password.service');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new Error('Email already exist');
            }

            const hashPassword = await passwordService.hash(password);
            const createUser = await User.create({...req.body, password: hashPassword});

            res.json(createUser);

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

};
