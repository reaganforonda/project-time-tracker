const axios = require('axios');

module.exports = {
    getAllClients : (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.GET_ALL_CLIENTS().then((clients) => {
            res.status(200).send(clients)
        }).catch((e)=> {
            console.log(`Error: ${e}`);
            res.sendStatus(500);
        })
    },

    addClient : (req, res) => {
        const dbInstance = req.app.get('db');
        const {user_id, client_name, address_one, address_two, city, state, country, phone, website, zip} = req.body;

        dbInstance.ADD_CLIENT([user_id, client_name, address_one, address_two, city, state, country, phone, website, zip]).then((client) => {
            res.status(200).send(client);
        }).catch((e) => {
            console.log(`Error : ${e}`);
            res.sendStatus(500);
        })
    }
}