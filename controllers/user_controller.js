const db = require('../dataBase/allUsers.json');
const fs = require('fs');
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

    createUser: async (req, res) => {
        console.log(req.body);
        db.push({...req.body, id: db.length + 1})
        res.json(db);
    },

    updateUser: async (req, res) => {
        const data = await readFiles(pathUsers);
        const {user_id} = req.params;

        data [id - 1] = {...data[id - 1], ...req.body};
        await writeFiles(pathUsers, JSON.stringify(data));

        res.json(data);
    }

}


