const axios = require("axios");

module.exports = {
  getAllClients: (req, res) => {
    const dbInstance = req.app.get("db");
    const { userid } = req.params;

    dbInstance
      .GET_ALL_CLIENTS([userid])
      .then(clients => {
        res.status(200).send(clients);
      })
      .catch(e => {
        console.log(`Error: ${e}`);
        res.sendStatus(500);
      });
  },

  addClient: (req, res) => {
    const dbInstance = req.app.get("db");

    const {
      user_id,
      client_name,
      address_one,
      address_two,
      city,
      state,
      country,
      phone,
      website,
      zip,
      active,
      email
    } = req.body;

    dbInstance
      .ADD_CLIENT([
        user_id,
        client_name,
        address_one,
        address_two,
        city,
        state,
        country,
        phone,
        website,
        zip,
        active,
        email
      ])
      .then(client => {
        res.status(200).send(client[0]);
      })
      .catch(e => {
        console.log(`Error : ${e}`);
        res.sendStatus(500);
      });
  },

  deleteClient: (req, res) => {
    const dbInstance = req.app.get("db");

    const { userid, clientid } = req.params;

    dbInstance
      .DELETE_CLIENT([clientid, userid])
      .then(result => {
        res.status(200).send(result);
      })
      .catch(e => {
        console.log(`Error: ${e}`);
        res.sendStatus(500);
      });
  },

  updateClient: (req, res) => {
    const dbInstance = req.app.get("db");

    const { userid, clientid } = req.params;

    console.log(req.body);
    const {
      client_name,
      address_one,
      address_two,
      city,
      state,
      country,
      phone,
      website,
      zip,
      active,
      email
    } = req.body;

    dbInstance
      .UPDATE_CLIENT_INFO([
        userid,
        clientid,
        client_name,
        address_one,
        address_two,
        city,
        state,
        country,
        phone,
        website,
        zip,
        active,
        email
      ])
      .then(result => {
        res.status(200).send(result);
      })
      .catch(e => {
        console.log(`Error PUT while trying to update client info: ${e}`);
        res.sendStatus(500);
      });
  }
};
