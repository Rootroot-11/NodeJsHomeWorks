const {
    EMAIL_EXIST, NOT_VALID_BODY,
    USER_NOT_FOUND,
    ACCESS, SUCCESFUL, WRONG_EMAIL_OR_PASSWORD
} = require('./errors.list');

module.exports = {
    ErrorHandler: require('./ErrorHandler'),
    WRONG_EMAIL_OR_PASSWORD,
    EMAIL_EXIST, NOT_VALID_BODY,
    USER_NOT_FOUND,
    ACCESS, SUCCESFUL
};
