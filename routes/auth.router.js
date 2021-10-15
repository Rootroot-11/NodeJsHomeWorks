const loginRouter = require('express').Router();

const loginUserController = require('../controllers/login.controller');
const loginAuthMiddleware = require('../middlewares/auth.middleware');

loginRouter.post('/', loginAuthMiddleware.isUserBodyValid, loginAuthMiddleware.loginUserMiddleware,
    loginUserController.loginUser);

module.exports = loginRouter;