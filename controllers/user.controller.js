const { User }= require('../dataBase');
const { passwordService } = require('../service');
const { userUtil } = require('../util');
const { CREATED, USER_UPDATE } = require('../errors');

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
            const {password} = req.body;

            const hashedPassword = await passwordService.hash(password);
            const newUser = User.create({...req.body, password: hashedPassword});

            userUtil.userNormalizator(newUser);

            res.json(CREATED.message, CREATED.status);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = await User.findByIdAndUpdate(user_id, req.body, {new: true}).lean();
            userUtil.userNormalizator(user);

            res.json(USER_UPDATE.message, USER_UPDATE.status);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            await User.findByIdAndDelete(user_id).select('-password');

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

};

