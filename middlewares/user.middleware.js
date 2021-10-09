const User = require('../dataBase/User');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({email: req.body.email});

            if (userByEmail) {
                throw new Error('Email already exists');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    userById: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const userById = await User.findById(user_id);

            if (!userById) {
                throw new Error('This person does not exist.');
            }

            req.userById = user;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
}