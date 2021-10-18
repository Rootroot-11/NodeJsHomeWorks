const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const {userRouter, authRouter} = require('./routes');
const {MONGO_CONNECT_URL, PORT, DEFAULT_STATUS_ERR} = require('./configs');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('*', (err, req, res) => {
    res
        .status(err.status || DEFAULT_STATUS_ERR)
        .json({
            message: err.message
        });

});

app.listen(PORT, () => {
    console.log(process.env);
    console.log(`App listen ${PORT}`);
});
