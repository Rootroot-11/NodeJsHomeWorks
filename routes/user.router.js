const router = require('express').Router();

const userController = require('../controllers/user.controller');
const {userMiddleware} = require('../middlewares');
const userByIdMiddleware = require('../middlewares/userById.middleware');

router.get('/', userController.getUsers);

router.post(
    '/',
    userMiddleware.isUserBodyValid,
    userMiddleware.createUserMiddleware,
    userController.createUser
);

router.get('/:user_id',
    userByIdMiddleware.checkIdMiddleware,
    userController.getUserById);

router.put('/:user_id',
    userMiddleware.isUpdateBodyValid,
    userByIdMiddleware.checkIdMiddleware,
    userController.updateUser);

router.delete('/:user_id',
    userByIdMiddleware.checkIdMiddleware,
    userController.deleteUser);

module.exports = router;
