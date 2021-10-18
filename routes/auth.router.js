const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const { authMiddleware } = require('../middlewares');

router.post('/',
    authMiddleware.isUserBodyValid,
    authMiddleware.loginUser,
    authController.loginUser
);

module.exports = router;
