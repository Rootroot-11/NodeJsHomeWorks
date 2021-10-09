const User = require('../dataBase/User');
// const {readFiles, writeFiles} = require("../services/service");
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
            const user = await User.findById(user_id).lean();

            const normalizedUser = userUtil.userNormalizator(user);

            console.log(normalizedUser);
            res.json(normalizedUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body);

            res.json(newUser);
        } catch (e) {
            res.json(e);
        }
        db.push({...req.body, id: db.length + 1});

        res.json(db);
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
}
