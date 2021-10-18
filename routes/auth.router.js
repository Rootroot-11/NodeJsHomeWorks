const router = require('express').Router();

const {authController} = require('../controllers');
const { authMiddleware } = require('../middlewares');

router.post('/',
    authMiddleware.isUserBodyValid,
    authMiddleware.loginUserMiddleware,
    authController.loginUser
);

module.exports = router;
