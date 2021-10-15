const User = require('../dataBase/User');
const { userNormalizator } = require("../util/user.util");

module.exports = {
    loginUser: (req, res, next) => {
        try {
            const { user } = req;

            const userNormalized = userNormalizator(user);

            res.json(userNormalized);
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    }

};