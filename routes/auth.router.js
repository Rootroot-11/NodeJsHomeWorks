const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const {authMiddleware, userMiddleware} = require('../middlewares');
// const {ADMIN, USER} = require('../configs/user-roles.enum');
const {FORGOT_PASSWORD} = require('../configs');
const {authValidator} = require('../validators');

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
    // TODO add validator (email)
    authController.sendMailForgotPassword);

router.put('/password/forgot',
    // TODO add validator (password)
    authMiddleware.checkActionToken(FORGOT_PASSWORD),
    authController.setNewPasswordAfterForgot);

module.exports = router;
