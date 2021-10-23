const {MONGO_CONNECT_URL, PORT} = require('./config');
const {PASSWORD_REGEXP, EMAIL_REGEXP, AUTHORIZATION} = require('./constans');
const userRoles = require('./user-roles.enum');
const {WELCOME, ORDER_CONFIRMED, LOGIN, LOGOUT, DELETE, UPDATE} = require('./email-action.enum');

module.exports = {
    MONGO_CONNECT_URL, PORT,
    PASSWORD_REGEXP, EMAIL_REGEXP,
    userRoles, AUTHORIZATION,
    WELCOME, ORDER_CONFIRMED, LOGIN, LOGOUT, DELETE, UPDATE
};
