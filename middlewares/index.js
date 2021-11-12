module.exports = {
    authMiddleware: require('./auth.middleware'),
    userMiddleware: require('./user.middleware'),
    userByIdMiddleware: require('./userByIdMiddleware'),
    apartmentMiddleware: require('./apartment.middleware'),
    commentMiddleware: require('./comment.middleware'),
    bookingMiddleware: require('./booking.middleware')
};
