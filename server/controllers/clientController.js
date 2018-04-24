const axios = require('axios');

module.exports = {
    getAllClients : (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.GET_ALL_CLIENTS().then((clients) => {
            console.log(clients);
            res.status(200).send(clients)
        })
    }
}