const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const { authMiddleware, userMiddleware } = require('../middlewares');

router.post('/',
    userMiddleware.isUserPresent,
    authMiddleware.loginUserMiddleware,
    authController.loginUser
);

router.post('/logout', authController.logoutUser);

module.exports = router;