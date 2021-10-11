const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find(req.body);

            res.json(users);
        } catch (e) {
            res.json(e);
        }
    },

    getUserById: async (req, res) => {
        try {
            const {user_id} = req.params;
            let user = await User.findById(user_id);

            user = userUtil.userNormalizator(user);
            res.json(user);
        } catch (e) {
            res.json(e);
        }

    },

    createUser: async (req, res) => {
        try {
            console.log('*************************************************');
            console.log(req.user);
            console.log('*************************************************');

            const hashedPassword = await passwordService(req.body.password);

            console.log('_____hashedPassword_____');
            console.log(hashedPassword);
            console.log('_____hashedPassword_____');


            const newUser = await User.create({...req.body, password: hashedPassword});

            res.json(newUser);
        } catch (e) {
            res.json(e);
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

