module.exports = {
    userNormalizator: (userNormalize = {}) => {
        const userToNormalized = {...userNormalize._doc};
        const fieldsToRemove = [
            'password',
            '__v'
        ];

        fieldsToRemove.forEach(field => {
            delete userToNormalized[field];
        });

        return userToNormalized;
    }
};
