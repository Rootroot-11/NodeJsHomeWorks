const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const {MONGO_CONNECT_URL, PORT} = require('./configs/config');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const {userRouter, authRouter} = require('./routes');

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        })

});


app.listen(PORT, () => {
    console.log(process.env);
    console.log(`App listen ${PORT}`);
});
