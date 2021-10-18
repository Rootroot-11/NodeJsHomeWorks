module.exports = {
    userNormalizator: (userNormalize={}) => {
        const userToNormalize = {...userNormalize._doc};
        const fieldsToRemove = [
            'password',
            '__v'
        ];

        fieldsToRemove.forEach((field) => {
            delete userToNormalize[field];
        });

        return userToNormalize;
    }
};
