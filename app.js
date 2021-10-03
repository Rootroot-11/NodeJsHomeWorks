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
