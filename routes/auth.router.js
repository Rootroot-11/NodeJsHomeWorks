const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const {authMiddleware, userMiddleware} = require('../middlewares');
// const {ADMIN, USER} = require('../configs/user-roles.enum');
const {FORGOT_PASSWORD} = require('../configs');

router.post(
    '/',
    userMiddleware.isUserPresent,
    authController.login
);

router.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout);

router.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refreshToken);

router.post('/password/forgot', authController.sendMailForgotPassword);

router.put('/password/forgot',
    authMiddleware.checkActionToken(FORGOT_PASSWORD),
    authController.setNewPasswordAfterForgot);

module.exports = router;
