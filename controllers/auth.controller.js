const {userNormalizator} = require("../util/user.util");
const {jwtService} = require('../service');
module.exports = {
    loginUser: (req, res) => {
        try {
            const { user } = req.body;

            const tokenPair = jwtService.generateTokenPair();
            const userNormalized = userNormalizator(user);

            res.json({
                user: userNormalized,
                ...tokenPair
            });
        } catch (e) {
            res.json(e.message);
        }
    },

};
