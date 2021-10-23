const {O_Auth, OAuthSchema} = require('../dataBase/O_Auth');
const {jwtService, emailService} = require('../service');
const {userNormalizator} = require('../util/user.util');
const {LOGIN, LOGOUT} = require('../configs');
const {ErrorHandler} = require('../errors');
const {User} = require('../dataBase');
const ActionTokenTypeEnum = require('../configs/action-token-type.enum');
const EmailActionEnum = require('../configs/email-action.enum');
const ActionToken = require('../dataBase/ActionToken');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user} = req;
            const {email, name} = req.body;

            // await user.comparePassword(req.body.password);
            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizator(user);

            await OAuthSchema.create({...tokenPair, user_id: userNormalized._id});

            await emailService.sendMail(email, LOGIN, {name});
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
            const {email, name} = req.body;

            await OAuthSchema.deleteOne({user_id: user._id});
            await emailService.sendMail(email, LOGOUT, {name});

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

    sendMailForgotPassword: async (req, res, next) => {
        try {

            const {email} = req.body;

            const user = User.findOne({email});

            if(!user) {
                throw new ErrorHandler('User not found', 404);
            }

            const actionToken = jwtService.generateActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD);

            await ActionToken.create({
                token: actionToken,
                token_type: ActionTokenTypeEnum.FORGOT_PASSWORD,
                user_id: user._id
            });

            await emailService.sendMail(email, EmailActionEnum.FORGOT_PASSWORD,
                {forgotPasswordUrl: `http://localhost:3000/passwordForgot?token=${actionToken}`});
            res.end('Ok');
        } catch (e) {
            next(e);
        }
    }
};

