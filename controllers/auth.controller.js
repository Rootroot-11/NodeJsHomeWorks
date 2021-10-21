const O_Auth = require('../dataBase/O_Auth');
const {jwtService} = require('../service');
const {userNormalizator} = require('../util/user.util');
const OAuthSchema = require('../dataBase/O_Auth');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user} = req;

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizator(user);

            await OAuthSchema.create({...tokenPair, user_id: userNormalized._id});

            res.json({
                user: userNormalized,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {user} = req;

            await OAuthSchema.deleteOne({user_id: user._id});

            res.end('You are logout');
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const {user} = req;

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizator(user);

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalized._id
            });

            res.json({
                user: userNormalized,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

};

