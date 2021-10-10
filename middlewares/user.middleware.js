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

            req.userById = user;

            if (!userById) {
                throw new Error('This person does not exist.');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    checkLogin: async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = await User.exists({_id: Types.ObjectId(id)});

            if (!user) {
                throw new Error('There is invalid logins');
            }
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
