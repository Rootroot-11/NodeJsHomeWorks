module.exports = {
    loginUser: (req, res, next) => {
        try {
            res.json('You are log in!');
        } catch (e) {
            next(e);
        }
    },

};
