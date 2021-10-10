const User = require('../dataBase/User');

module.exports = {
    loginUserMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const userFound = await User.findOne({email, password});
            if (!userFound) {
                throw new Error('Your email or password is incorrect!');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }

};
