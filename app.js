const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const {MONGO_CONNECT_URL, PORT} = require('./configs/config');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(helmet());
// app.use(cors({origin: _configureCors}));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));

app.use(fileUpload({}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const {authRouter, userRouter, apartmentRouter, commentRouter, bookingRouter} = require('./routes');

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/apart', apartmentRouter);
app.use('/comment', commentRouter);
app.use('/booking', bookingRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            msg: err.message
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});
