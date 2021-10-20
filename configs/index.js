const { MONGO_CONNECT_URL, PORT } = require('./config');
const {PASSWORD_REGEX, EMAIL_REGEX, DEFAULT_STATUS_ERR} = require('./constans');
const userRoles = require('./user-roles.enum');
const { ACCESS, REFRESH } = require('./token-type.enum');

module.exports = {
    MONGO_CONNECT_URL, PORT,
    PASSWORD_REGEX, EMAIL_REGEX, DEFAULT_STATUS_ERR,
    userRoles, ACCESS, REFRESH
};
