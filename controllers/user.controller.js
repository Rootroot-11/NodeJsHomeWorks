const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = await User
                .findById(user_id)
                .lean
            const UserNormalized = userUtil.userNormalizator(user);
            res.json(UserNormalized);
        } catch (e) {
            next(e.message);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);
            const newUser = User.create({...req.body, password: hashedPassword});

            req.body.pasword = hashedPassword;
            res.json(newUser);
        } catch (e) {
            next(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user_id} = req.params;

            const deleteUser = await User.findByIdAndDelete(user_id);

            res.json(deleteUser);
        } catch (e) {
            res.json(e.message);
        }
    }

};

