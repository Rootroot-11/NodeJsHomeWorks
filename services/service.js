const fs = require('fs');
const util = require('util');
const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

async function readFiles(pathUsers) {
    const data = await readFilePromise(pathUsers);

    return JSON.parse(data.toString());
}

async function writeFiles(pathUsers, file) {
    await writeFilePromise(pathUsers, JSON.stringify(file));
}

module.exports = {readFiles, writeFiles};