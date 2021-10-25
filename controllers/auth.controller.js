const {O_Auth, User, ActionToken } = require('../dataBase');
const {emailService, passwordService, jwtService} = require('../service');
const {userUtil} = require('../util');
// const {LOGIN, LOGOUT} = require('../configs');
const {ErrorHandler} = require('../errors');
const ActionTokenTypeEnum = require('../configs/action-token-type.enum');
const EmailActionEnum = require('../configs/email-action.enum');

module.exports = {
    login: async (req, res, next) => {
        try {
            const user = req.user;

            const tokenPair = jwtService.generateTokenPair();

            const normalizedUser = userUtil.userNormalizator(user.toObject());

            await O_Auth.create({...tokenPair, user_id: normalizedUser._id});

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
            await User.find();

            res.json('You are logout');
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const {user} = req;

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userUtil.userNormalizator(user);

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

            const user = await User.findOne({email});

            if (!user) {
                throw new ErrorHandler('User not found', 404);
            }

            const actionToken = jwtService.generateActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD);

            await ActionToken.create({
                token: actionToken,
                token_type: ActionTokenTypeEnum.FORGOT_PASSWORD,
                user_id: user._id
            });

            await emailService.sendMail(
                email,
                EmailActionEnum.FORGOT_PASSWORD,
                {forgotPasswordUrl: `http://localhost:3000/passwordForgot?token=${actionToken}`});
            console.log({ActionToken});
            res.json('Ok');
        } catch (e) {
            next(e);
        }
    },

    setNewPasswordAfterForgot: async (req, res, next) => {
        try {
            const {user, body: {password}} = req;

            const newPassword = await passwordService.hash(password);

            await User.findByIdAndUpdate({_id: user._id}, {password: newPassword});

            await O_Auth.deleteMany({user_id: user._id});

            res.json('okey');
        } catch (e) {
            next(e);
        }
    }

};

