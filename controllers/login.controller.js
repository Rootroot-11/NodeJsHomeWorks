const {userNormalizator} = require("../util/user.util");
const User = require('../dataBase/User');

module.exports = {
    loginUser: (req, res) => {
        try {
            const {user} = req;

            const userNormalized = userNormalizator(user);

            res.json(userNormalized);
        } catch (e) {
            res.json(e.message);
        }
    },

};
