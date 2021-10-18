module.exports = {
    loginUser: (req, res) => {
        try {
            res.json('You are log in!');
        } catch (e) {
            res.json(e.message);
        }
    },

};
