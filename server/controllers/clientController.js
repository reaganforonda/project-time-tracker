const axios = require('axios');

module.exports = {
    getAllClients : (req, res) => {
        const dbInstance = req.app.get('db');
        const {userid} = req.params

        dbInstance.GET_ALL_CLIENTS([userid]).then((clients) => {
            res.status(200).send(clients)
        }).catch((e)=> {
            console.log(`Error: ${e}`);
            res.sendStatus(500);
        })
    },

    addClient : (req, res) => {
        const dbInstance = req.app.get('db');
        console.log(req.body);
        const {user_id, client_name, address_one, address_two, city, state, country, phone, website, zip} = req.body;
        

        dbInstance.ADD_CLIENT([user_id, client_name, address_one, address_two, city, state, country, phone, website, zip]).then((client) => {
            res.status(200).send(client[0]);
        }).catch((e) => {
            console.log(`Error : ${e}`);
            res.sendStatus(500);
        })
    },

    deleteClient : (req, res) => {
        const dbInstance = req.app.get('db');

        const {userid, clientid} = req.params;
        

        dbInstance.DELETE_CLIENT([clientid, userid]).then((result) => {
            res.status(200).send(result);
        }).catch((e)=> {
            console.log(`Error: ${e}`);
            res.sendStatus(500);
        })
    }
}