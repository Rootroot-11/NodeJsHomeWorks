const User = require('../dataBase/User');
const userValidator = require('../validators/user.validators');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({email: req.body.email});

            if (userByEmail) {
                throw new Error('Email already exist');
            }

            req.user = 'Y';
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

    doesUserExist: (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = User.findById(user_id, {__v: 0});

            if (!user) {
                throw new Error("User with this ID does not exist");
            }

            req.user = user;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }

};
