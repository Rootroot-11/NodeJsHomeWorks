const express = require('express');

const app = express();

app.get('/users', (req, res)=> {
    res.json('Hello World');
});

app.post('/users', (req, res)=> {
    res.json('Hello World');
});

app.put('/users/3', (req, res)=> {
    res.json('Hello World');
});

app.delete('/users/7', (req, res)=> {
    res.json('Hello World');
});

app. listen(5000, ()=> {
    console.log(`App listen 5000`);
});

