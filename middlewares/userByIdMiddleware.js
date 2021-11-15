const {User} = require('../dataBase');
const { ErrorHandler, USER_NOT_FOUND } = require('../errors');

module.exports = {
    checkIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const oneUser = await User.findById(user_id).select('-password');

            if (!oneUser) {
                throw new ErrorHandler(USER_NOT_FOUND.message, USER_NOT_FOUND.status);
            }
            req.user = oneUser;
            next();
        } catch (e) {
            next(e);
        }
    }

};
