const router = require('express').Router();

const userController = require('../controllers/user.controller');
const {userMiddleware, userByIdMiddleware, authMiddleware} = require('../middlewares');
const {userValidator} = require('../validators');

router.get('/', userController.getUsers);

router.post(
    '/',
    userMiddleware.isBodyValid(userValidator.createUserValidator),
    userMiddleware.createUserMiddleware,
    userController.createUser
);

router.get('/:user_id',
    userByIdMiddleware.checkIdMiddleware,
    userController.getUserById);

router.put('/:user_id',
    userMiddleware.isBodyValid(userValidator.updateUserValidator),
    authMiddleware.checkAccessToken,
    userByIdMiddleware.checkIdMiddleware,
    userController.updateUser);

router.delete('/:user_id',
    authMiddleware.checkAccessToken,
    userByIdMiddleware.checkIdMiddleware,
    userController.deleteUser);

module.exports = router;
