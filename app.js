const fs = require('fs');
const path = require('path');

const mkdirPathOldMan = path.join(__dirname, 'allUsers', 'manOlder20');
const mkdirPathYoungMan = path.join(__dirname, 'allUsers', 'manYounger20');
const mkdirPathOldWoman = path.join(__dirname, 'allUsers', 'womanOlder20');
const mkdirPathYoungerWoman = path.join(__dirname, 'allUsers', 'womanYounger20');

fs.mkdir(mkdirPathOldMan, {recursive: true}, (err) => {
    console.log(err);
});

fs.mkdir(mkdirPathYoungMan, {recursive: true}, (err) => {
    console.log(err);
});

fs.mkdir(mkdirPathOldWoman, {recursive: true}, (err) => {
    console.log(err);
});

fs.mkdir(mkdirPathYoungerWoman, {recursive: true}, (err) => {
    console.log(err);
});

fs.appendFile(`${__dirname}/allUsers/manOlder20/Arseniy.txt`, 'Hello world22', (err) => {
    console.log(err);
});

const users = [
    {name: "Sasha", gender: "male", age: 12},
    {name: "Yulia", gender: "female", age: 25},
    {name: "Oleh", gender: "male", age: 10},
    {name: "Arseniy", gender: "male", age: 45},
    {name: "Ivan", gender: "male", age: 19},
    {name: "Masha", gender: "female", age: 11},
    {name: "Katya", gender: "female", age: 13},
    {name: "Olha", gender: "female", age: 23},
    {name: "Misha", gender: "male", age: 29},
    {name: "Natasha", gender: "female", age: 42}

];


users.forEach(user => {
    if (user.gender === 'male' && user.age > 20) {
        fs.writeFile(path.join(__dirname, 'allUsers', 'manOlder20', `${user.name}.txt`), 
            JSON.stringify(user), err => {
                console.log(err);
            })
    }
    else if (user.gender === 'male' && user.age < 20) {
        fs.writeFile(path.join(__dirname, 'allUsers', 'manYounger20', `${user.name}.txt`), 
            JSON.stringify(user), err => {
                console.log(err);
            })
    }
    else if (user.gender === 'female' && user.age > 20) {
        fs.writeFile(path.join(__dirname, 'allUsers', 'womanOlder20', `${user.name}.txt`), 
            JSON.stringify(user), err => {
            console.log(err);
        })
    }
    else if (user.gender === 'female' && user.age < 20) {
        fs.writeFile(path.join(__dirname, 'allUsers', 'womanYounger20', `${user.name}.txt`),
            JSON.stringify(user), err => {
                console.log(err);
            })
    }
})
