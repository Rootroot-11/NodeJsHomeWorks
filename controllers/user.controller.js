const User = require('../dataBase/User');
const { passwordService, emailService } = require('../service');
const userUtil = require('../util/user.util');
const { WELCOME } = require('../configs/email-action.enum');

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

            const {email, password, name} = req.body;

            const hashedPassword = await passwordService.hash(password);

            const newUser = await User.create({...req.body, password: hashedPassword});

            await emailService.sendMail(email, WELCOME, {name} );

            res.json(newUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            let user = await User.findByIdAndUpdate(user_id, req.body, {new: true}).lean();
            user = userUtil.userNormalizator(user);

            res.json(user);
        } catch (e) {
            res.json(e.message);
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
