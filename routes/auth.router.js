const router = require('express').Router();

const loginController = require('../controllers/auth.controller');
const { authMiddleware, userMiddleware } = require('../middlewares');

router.post('/',
    authMiddleware.isUserBodyValid,
    userMiddleware.isUserPresent,
    authMiddleware.loginUser,
    loginController.loginUser
);

module.exports = router;