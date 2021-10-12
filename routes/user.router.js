const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');
const checkUserIdMiddleware = require('../middlewares/user.middleware');

router.get('/', userController.getUsers);
router.post('/', userMiddleware.createUserMiddleware, userController.createUser);

router.get('/:user_id', checkUserIdMiddleware.checkUserById, userController.getUserById);
router.delete('/:user_id', checkUserIdMiddleware.checkUserById, userController.deleteUser);

module.exports = router;
