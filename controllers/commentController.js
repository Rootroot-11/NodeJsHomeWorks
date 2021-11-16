const {Comment} = require('../dataBase');
const {USER_DELETE} = require('../errors');

module.exports = {
    createComment: async (req, res, next) => {
        try {
            const {user_id, apartment_id} = req.params;
            const newComment = await Comment.create({...req.body, user_id, apartment_id});


            res.json(newComment);
        } catch (e) {
            next(e);
        }
    },

    getComments: async (req, res, next) => {
        try {
            const comments = await Comment.find();

            res.json(comments);
        } catch (e) {
            next(e);
        }
    },

    updateComment: async (req, res, next) => {
        try {
            const {comment_id} = req.params;

            const newComment = await Comment.findByIdAndUpdate(comment_id, req.body, {new: true});

            res.json(newComment);
        } catch (e) {
            next(e);
        }
    },

    deleteComment: async (req, res, next) => {
        try {
            const {comment_id:_id} = req.params;

            await Comment.deleteOne({_id});

            res.json(USER_DELETE.status, USER_DELETE.message);
        } catch (e) {
            next(e);
        }
    }
};
