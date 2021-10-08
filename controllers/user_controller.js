const db = require('../dataBase/allUsers.json');
const path = require("path");
const {readFiles, writeFiles} = require("../services/service");
const pathUsers = path.join(__dirname, '../', 'dataBase', 'allUsers.json');

module.exports = {

    getUsers: async (req, res) => {
        const data = await readFiles(pathUsers);

        res.json(data);
    },

    getUserById: async (req, res) => {
        const data = await readFiles(pathUsers);
        const {user_id} = req.params;
        const user = data.find(user => user.id === +user_id);

        res.json(user);
    },

    createUser: (req, res) => {
        db.push({...req.body, id: db.length + 1});

        res.json(db);
    },

    deleteUser: async (req, res) => {
        const users = await readFiles(pathUsers);
        const {user_id} = req.params;

        const user = users.filter(user => user.id !== +user_id);
        await writeFiles(pathUsers, user);

        res.json(user);
    }
}


