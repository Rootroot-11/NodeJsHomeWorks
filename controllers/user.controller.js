const {User} = require('../dataBase');
const { emailService, passwordService, userService } = require('../service');
const { userUtil } = require('../util');
const { UPDATE, WELCOME } = require('../configs');
const { CREATED, USER_DELETE } = require('../errors');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers(req.query);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const {user} = req;

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {email, password, name} = req.body;

            const hashedPassword = await passwordService.hash(password);

            const newUser = await User.create({...req.body, password: hashedPassword});

            await emailService.sendMail(email, WELCOME, {name});
            userUtil.userNormalizator(newUser);

            res.json(CREATED.message, CREATED.status);
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

            res.json(USER_DELETE.message, USER_DELETE.status);
        } catch (e) {
            next(e);
        }
    }

};
