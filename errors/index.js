const {
    EMAIL_EXIST, ACCESS,
    USER_NOT_FOUND, WRONG_EMAIL_OR_PASSWORD,
    USER_UPDATE, USER_DELETE, CREATED, BAD_REQUEST
} = require('./errors.list');

module.exports = {
    ErrorHandler: require('./ErrorHandler'),
    EMAIL_EXIST, ACCESS,
    USER_NOT_FOUND, WRONG_EMAIL_OR_PASSWORD,
    USER_UPDATE, USER_DELETE, CREATED, BAD_REQUEST,
    errors_code: require('./errors-enum'),
    errors_message: require('./errors_message')
};
