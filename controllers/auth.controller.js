const { passwordService } = require("../service");

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const {password} = req.body;
            const hashPassword = req.user;

            await passwordService.compare(password, hashPassword.password);

            res.json(req.user);
        } catch (e) {
            next(e);
        }
    }
};
