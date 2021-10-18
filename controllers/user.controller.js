const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {

        try {
            const {user_id} = req.params;

            const user = await User
                .findById(user_id)
                .select()
                .lean();

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordService.hash(password);
            const newUser = User.create({...req.body, password: hashedPassword});

            const normalizedUser = userUtil.userNormalizator(newUser);

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const deleteUser = await User.findByIdAndDelete(user_id).select('-password');

            res.json(deleteUser);
        } catch (e) {
            next(e);
        }
    }

};

