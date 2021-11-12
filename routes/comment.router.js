const {authMiddleware, userByIdMiddleware, apartmentMiddleware, commentMiddleware} = require('../middlewares');
const {commentController} = require('../controllers');
const router = require('express').Router();

router.post('/:user_id/:apartment_id',
    authMiddleware.checkAccessToken,
    // commentMiddleware.isCommentValid,
    userByIdMiddleware.checkIdMiddleware,
    apartmentMiddleware.checkApartmentIdMiddleware,
    commentController.createComment
);

router.get('/',
    commentController.getComments);

router.put('/:user_id',
    authMiddleware.checkAccessToken,
    commentMiddleware.isCommentValid,
    commentController.updateComment);

router.delete('/:user_id',
    authMiddleware.checkAccessToken,
    commentController.deleteComment);

module.exports = router;
