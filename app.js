const fs = require('fs');
const path = require('path');

const appendBoysPath = path.join(__dirname, 'users', 'boys');
const appendGirlsPath = path.join(__dirname, 'users', 'girls');


fs.readdir(appendBoysPath, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    data.forEach((item) => {
        fs.readFile( (err, data) => {
            if(err) {
                console.log(err);
                return;
            }
                console.log(item)
        }
        )
    } )
})




