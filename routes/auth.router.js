const loginRouter = require('express').Router();

const authUserController = require('../controllers/auth.controller');
const loginMiddleware = require('../middlewares/login.Middleware');
const authMiddleware = require('../middlewares/login.Middleware');

loginRouter.post('/login', loginMiddleware.loginUserMiddleware, authMiddleware.isAuthenticationValid,
    authUserController.loginUser);

module.exports = loginRouter;