const router = require('express').Router();

const {authController} = require('../controllers');
const { authMiddleware} = require('../middlewares');

router.post('/',
    authMiddleware.isUserBodyValid,
    authMiddleware.isUserPresent,
    authController.loginUser
);

module.exports = router;
