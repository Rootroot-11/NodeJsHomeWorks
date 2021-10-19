const {userNormalizator} = require("../util/user.util");
const {jwtService} = require('../service');
const {O_Auth} = require('../dataBase');

module.exports = {
    loginUser: async (req, res) => {
        try {
            const {user} = req;

            const tokenPair = jwtService.generateTokenPair();
            const normalizedUser = userNormalizator(user);

            await O_Auth.create({
                ...tokenPair,
                user_id: normalizedUser._id
            });

            res.json({
                user: normalizedUser,
                ...tokenPair
            });
        } catch (e) {
            res.json(e.message);
        }
    },

};
