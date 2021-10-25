module.exports = {
    EMAIL_EXIST: {
        message: 'Email already exist',
        status: 404
    },

    BAD_REQUEST: {
        message: 'Body is not valid',
        status: 400
    },

    USER_NOT_FOUND: {
        message: 'User not found',
        status: 404
    },

    WRONG_EMAIL_OR_PASSWORD: {
        message: 'Wrong email or password',
        status: 400
    },

    USER_UPDATE: {
        message: 'USER is UPDATE',
        status: 201
    },

    USER_DELETE: {
        message: 'USER DELETED',
        status: 204
    },

    CREATED: {
        message: 'User created',
        status: 201
    },

    ACCESS: {
        message: 'Access denied',
        status: 400
    },

    WRONG_TOKEN: {
        message: 'Wrong token',
        status: 401
    }

};
