const User = require('../dataBase/User');
const {emailService} = require('../service');
const {userUtil} = require('../util');
const { UPDATE} = require('../configs');
const {errors_code, errors_message} = require('../errors');

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
                .select('-password')
                .lean();

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {

            const newUser = await User.createUserWithHashPassword(req.body);

            await emailService.sendMail(email, WELCOME, {name});
            userUtil.userNormalizator(newUser);
            res.json(newUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            let user = await User.findByIdAndUpdate(user_id, req.body, {new: true}).lean();

            await emailService.sendMail(user.email, UPDATE, {userName: user.name});

            user = userUtil.userNormalizator(user);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            await User.findByIdAndDelete(user_id).select('-password');

            res.status(errors_code.DELETE_USER).json(errors_message.DELETEUSER);
        } catch (e) {
            next(e);
        }
    }

};
