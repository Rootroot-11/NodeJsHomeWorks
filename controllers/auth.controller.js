const userUtil = require('../util/user.util')

module.exports = {
    loginUser: async (req, res) => {
        const user = req.user;

        const NormalizedUser = userUtil.userNormalizator(user.toObject());

        res.json(NormalizedUser);
    }
};

