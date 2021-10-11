const loginRouter = require('express').Router();

const loginUserController = require('../controllers/login.controller');
const loginMiddleware = require('../middlewares/login.Middleware');
const authMiddleware = require('../middlewares/login.Middleware');

loginRouter.post('/login', loginMiddleware.loginUserMiddleware, authMiddleware.isAuthenticationValid,
    loginUserController.loginUser);

module.exports = loginRouter;
