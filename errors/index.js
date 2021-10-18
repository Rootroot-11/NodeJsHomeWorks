const {
    EMAIL_EXIST, NOT_VALID_BODY,
    USER_NOT_FOUND, WRONG_EMAIL_OR_PASSWORD,
    USER_UPDATE, USER_DELETE, CREATED
} = require('./errors.list');

module.exports = {
    ErrorHandler: require('./ErrorHandler'),
    EMAIL_EXIST, NOT_VALID_BODY,
    USER_NOT_FOUND, WRONG_EMAIL_OR_PASSWORD,
    USER_UPDATE, USER_DELETE, CREATED
};

