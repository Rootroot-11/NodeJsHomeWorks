const loginRouter = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

loginRouter.post('/', authMiddleware.isUserBodyValid, authMiddleware.loginUserMiddleware,
    authController.loginUser);

module.exports = loginRouter;
