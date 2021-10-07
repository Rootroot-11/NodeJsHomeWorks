const router = require('express').Router();

const userController = require('../controllers/user_controller');

router.get('/', userController.getUsers);

router.post('/', userController.createUser);

router.get('/:user_id', userController.getUserById);

router.put('/:user_id', userController.updateUser);

module.exports = router;
