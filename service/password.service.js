const bcrypt = require('bcrypt');

const { ErrorHandler, USER_NOT_FOUND } = require('../errors');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hashPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler(USER_NOT_FOUND.message, USER_NOT_FOUND.status);
        }
        return isPasswordMatched;
    }

};
