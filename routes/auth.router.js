const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const {authMiddleware, userMiddleware} = require('../middlewares');
const {ADMIN, USER} = require("../configs/user-roles.enum");

router.post(
    '/',
    userMiddleware.isUserPresent,
    userMiddleware.checkUserRole([
        ADMIN,
        USER
    ]),
    authController.login
);
router.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout);

router.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refreshToken);

module.exports = router;
