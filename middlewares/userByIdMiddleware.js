const User = require('../dataBase/User')

module.exports = {
    checkIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const oneUser = await User.findById(user_id).lean();

            if (!oneUser) {
                throw new Error('There is no User with that ID');
            }
            req.user = oneUser;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};