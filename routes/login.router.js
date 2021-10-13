const loginRouter = require('express').Router();

const loginUserController = require('../controllers/login.controller');
const loginMiddleware = require('../middlewares/loginMiddleware');

loginRouter.post('/', loginMiddleware.loginUserMiddleware, loginUserController.loginUser);

module.exports = loginRouter;
