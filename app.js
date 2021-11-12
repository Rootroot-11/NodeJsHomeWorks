const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
// const helmet = require('helmet');
require('dotenv').config();

const {MONGO_CONNECT_URL, PORT} = require('./configs/config');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const {authRouter, userRouter, apartmentRouter, commentRouter, bookingRouter} = require('./routes');

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/apart', apartmentRouter);
app.use('/comment', commentRouter);
app.use('/booking', bookingRouter);

// app.use('*', (err, req, res, next) => {
//     res
//         .status(err.status || 500)
//         .json({
//             msg: err.message
//         });
// });

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});
