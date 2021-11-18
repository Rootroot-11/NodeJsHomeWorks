const router = require('express').Router();

const userController = require('../controllers/user.controller');
const {userMiddleware, userByIdMiddleware} = require('../middlewares');
const {userValidator} = require('../validators');

router.post(
    '/',
    userMiddleware.isBodyValid(userValidator.createUserValidator),
    userMiddleware.createUserMiddleware,
    userController.createUser
);

router.get('/',
    userController.getUsers);

router.get('/:user_id',
    userByIdMiddleware.checkIdMiddleware,
    userController.getUserById);

router.put('/:user_id',
    userMiddleware.isBodyValid(userValidator.updateUserValidator),
    userByIdMiddleware.checkIdMiddleware,
    userController.updateUser);

router.delete('/:user_id',
    userByIdMiddleware.checkIdMiddleware,
    userController.deleteUser);

module.exports = router;
