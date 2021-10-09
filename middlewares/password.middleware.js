const User = require("../dataBase/User");

module.exports = {
    userAutor: async (req, res, next) => {
        try {
            const {email, password} = req.params;
            const user = await User.findById({user_id});

            if (!user) {
                throw new Error('Your mail or password is false!');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
}