const fs = require('fs');
const path = require('path');

const pathToBoys = path.join(__dirname, 'users', 'boys');
const pathToGirls = path.join(__dirname, 'users', 'girls');

const sortUsers = (gender, oldFolder, newFolder) => {
    fs.readdir(oldFolder, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        data.forEach(( value ) => {
            fs.readFile(path.join(oldFolder, value), (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }

                const user = JSON.parse(data.toString());

                if (user.gender === gender) {
                    fs.rename(path.join(oldFolder, value), path.join(newFolder, value), err => {
                        if (err) {
                            console.log(err);
                        }
                    })
                }
            });
        });
    });
};

sortUsers('male', pathToGirls, pathToBoys);
sortUsers('female', pathToBoys, pathToGirls);


