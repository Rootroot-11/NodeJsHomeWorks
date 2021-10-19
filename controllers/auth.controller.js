const {userUtil} = require('../util');

module.exports = {
    loginUser: (req, res) => {
        try {
            const {user} = req;
            const userNormalized = userUtil.userNormalizator(user);

            res.json(userNormalized);
        } catch (e) {
            res.json(e);
        }
    }
};

