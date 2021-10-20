const {userNormalizator} = require("../util/user.util");
const {jwtService} = require('../service');
const {O_Auth} = require('../dataBase');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const {user} = req;

            const tokenPair = jwtService.generateTokenPair();
            const normalizedUser = userNormalizator(user.toObject());

            await O_Auth.create({
                ...tokenPair,
                user_id: normalizedUser._id
            });

            res.json({
                user: normalizedUser,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {access_token} = req;

            await O_Auth.findOneAndDelete({ access_token });

            res.json ('You are log out')

        } catch (e) {
            next(e);
        }
    }

};
