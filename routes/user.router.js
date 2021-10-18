const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');
const userIdMiddleware = require('../middlewares/userByIdMiddleware');

router.get('/', userController.getUsers);

router.post('/',
    userMiddleware.isUserBodyValid,
    userMiddleware.createUserMiddleware,
    userController.createUser);

router.get('/:user_id',
    userIdMiddleware.checkIdMiddleware,
    userMiddleware.createUserMiddleware,
    userController.getUserById);

router.put('/:user_id',
    userMiddleware.isUpdateBodyValid,
    userIdMiddleware.checkIdMiddleware,
    userController.updateUser);

router.delete('/:user_id',
    userIdMiddleware.checkIdMiddleware,
    userController.deleteUser);

module.exports = router;
