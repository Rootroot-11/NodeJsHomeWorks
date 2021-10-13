const User = require('../dataBase/User');

module.exports = {

    getUsers: async (req, res) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            res.json(e.message);
        }

    },

    getUserById: (req, res) => {
        try {
            res.json(req.user);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body);

            res.json(newUser);
        } catch (e) {
            res.json(e.message);
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
