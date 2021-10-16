const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find().lean();
            users.map(user => userUtil.userNormalizator(user));

            res.json(users);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserById: (req, res) => {
        try {
            const userNormalized = userUtil.userNormalizator(req.user);

            res.json(userNormalized);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordService.hash({ password });

            const newUser = await User.create({ ...req.body, password: hashedPassword });

            res.json(newUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUser: (req, res) => {
        try {
            const { user_id } = req.params;
            let user = User.findByIdAndUpdate(user_id, req.user).lean();
            user = userUtil.userNormalizator(user);

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user_id} = req.params;

            const deleteUser = await User.findByIdAndDelete(user_id).select('-password');

            res.json(deleteUser);
        } catch (e) {
            res.json(e.message);
        }
    }

};

