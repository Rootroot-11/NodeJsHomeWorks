const {userUtil} = require('../util');

module.exports = {
    loginUser: (req, res, next) => {
        try {
            const {user} = req;
            const userNormalized = userUtil.userNormalizator(user);

            res.json(userNormalized);
        } catch (e) {
            next(e);
        }
    }
};

