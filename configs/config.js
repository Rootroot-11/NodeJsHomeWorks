module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',

    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/june-2021',
    PORT: process.env.PORT || 5000,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'zzz',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'xxx',
    JWT_FORGOT_PASSWORD_SECRET: process.env.JWT_FORGOT_PASSWORD_SECRET || 'kkk',
    JWT_ACTIVATE_ACCOUNT_SECRET: process.env.JWT_ACTIVATE_ACCOUNT_SECRET || 'yyy',

    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000'
};
