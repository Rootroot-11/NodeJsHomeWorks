const loginRouter = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware, userMiddleware} = require('../middlewares');

loginRouter.post('/',
    authMiddleware.isUserBodyValid,
    userMiddleware.isUserPresent,
    authMiddleware.isPasswordsMatched,
    authController.loginUser);

module.exports = loginRouter;
