const router = require('express').Router();

const userMiddleware = require('../middlewares/user.middleware');
const userController = require('../controllers/user.controller');

router.get('/', userController.getUsers);
router.post('/', userMiddleware.createUserMiddleware, userController.createUser);

router.get('/:user_id', userMiddleware.createUserMiddleware, userController.getUserById);
router.delete('/:user_id', userController.deleteUser);

module.exports = router;