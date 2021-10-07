const fs = require('fs');
const path = require('path');
const util = require('util');

// const pathUsers = path.join(__dirname, '../', 'dataBase', 'allUsers.json');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

async function readFiles(pathUsers) {
    const data = await readFilePromise(pathUsers);

    return JSON.parse(data.toString());
}

async function writeFiles(pathUsers, newData) {
    await writeFilePromise(pathUsers, newData);
}

module.exports = {readFiles, writeFiles};