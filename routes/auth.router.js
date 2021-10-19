const router = require('express').Router();

const {authController} = require('../controllers');
const { authMiddleware, userMiddleware} = require('../middlewares');
const {ADMIN, USER} = require("../configs/user-roles.enum");

router.post('/',
    userMiddleware.isUserPresent,
    userMiddleware.checkUserRole([
        ADMIN,
        USER
    ]),
    authMiddleware.isPasswordsMatched,
    authController.loginUser
);

module.exports = router;
