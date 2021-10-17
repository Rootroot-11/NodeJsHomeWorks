const {
    EMAIL_EXIST, NOT_VALID_BODY,
    USER_NOT_FOUND, WRONG_EMAIL_OR_PASSWORD,
    ACCESS
} = require('./errors.list');

module.exports = {
    ErrorHandler: require('./ErrorHandler'),
    EMAIL_EXIST, NOT_VALID_BODY,
    USER_NOT_FOUND, WRONG_EMAIL_OR_PASSWORD,
    ACCESS
};
