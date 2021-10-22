const {MONGO_CONNECT_URL, PORT} = require('./config');
const {PASSWORD_REGEXP, EMAIL_REGEXP, DEFAULT_STATUS_ERR} = require('./constans');
const userRoles = require('./user-roles.enum');
const AUTHORIZATION = require('./constans');
const {WELCOME, ORDER_CONFIRMED, LOGIN, LOGOUT, DELETE, UPDATE} = require('./email-action.enum');

module.exports = {
    MONGO_CONNECT_URL, PORT,
    PASSWORD_REGEXP, EMAIL_REGEXP, DEFAULT_STATUS_ERR,
    userRoles, AUTHORIZATION,
    WELCOME, ORDER_CONFIRMED, LOGIN, LOGOUT, DELETE, UPDATE
};
