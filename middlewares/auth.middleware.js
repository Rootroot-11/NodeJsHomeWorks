const User = require('../dataBase/User');
const { authValid } = require('../validators/auth.validators');

module.exports = {

    loginUserMiddleware: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userFound = await User.findOne({ email });

            if (!userFound) {
                return next ({
                    message: 'Wrong email or password',
                    status: 400
                });
            }

            req.user = userFound;
            next();
        } catch (e) {
            next(e);
        }
    }

};