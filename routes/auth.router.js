const authRouter = require('express').Router();

const loginUserController = require('../controllers/login.controller');
const loginMiddleware = require('../middlewares/login.Middleware');
const authMiddleware = require('../middlewares/login.Middleware');

authRouter.post('/', loginMiddleware.loginUserMiddleware, authMiddleware.isAuthenticationValid,
    loginUserController.loginUser);

module.exports = authRouter;