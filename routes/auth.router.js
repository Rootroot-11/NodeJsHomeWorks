const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const {authMiddleware, userMiddleware} = require('../middlewares');
const {FORGOT_PASSWORD} = require('../configs');
const {emailValidator, newPasswordValidator, authValidator} = require('../validators');

router.post(
    '/',
    userMiddleware.isBodyValid(authValidator.authValid),
    userMiddleware.isUserPresent,
    authMiddleware.checkPassword,
    authController.login
);

router.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout);

router.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refreshToken);

router.post('/password/forgot',
    authMiddleware.isForgotPassValid(emailValidator.emailValidator),
    authController.sendMailForgotPassword);

router.put('/password/forgot',
    authMiddleware.isForgotPassValid(newPasswordValidator.newPasswordValidator),
    authMiddleware.checkActionToken(FORGOT_PASSWORD),
    authController.setNewPasswordAfterForgot);

module.exports = router;
