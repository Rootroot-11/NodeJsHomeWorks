const {commentValidator} = require('../validators');
const {ErrorHandler, BAD_REQUEST} = require('../errors');

module.exports = {
    isCommentValid: (req, res, next) => {
        try {
            const {error, value} = commentValidator.commentValidator.validate(req.body);
            if (error) {

                throw new ErrorHandler (error.details[0].message, BAD_REQUEST.status);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
};
