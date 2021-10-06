const db = require('../dataBase/allUsers.json');
const fs = require('fs');
const path = require("path");

const pathUsers = path.join(__dirname, '../', 'dataBase', 'allUsers.json');

module.exports = {

    getUsers: (req, res) => {
        fs.readFile(path.join(pathUsers), (err, data) => {
            if (err) {
                console.log(err)
                return
            }
            const user = JSON.parse(data.toString());

            if (user.id === data.id) {
                res.json(user);
            }
        });
    },

    getUserById: (req, res) => {
        fs.readFile(path.join(pathUsers), (err, data) => {
                if (err) {
                    console.log(err)
                    return
                }
                const users = JSON.parse(data.toString());
                const {user_id} = req.params;
                const user = users.find(user => user.id === +user_id);
                res.json(user);
            }
        )
    },

    createUser: (req, res) => {
        console.log(req.body);
        db.push({...req.body, id: db.length + 1})
        res.json(db);
    },

    updateUser: (req, res) => {
        res.json('UPDATE USER');
    }

}


