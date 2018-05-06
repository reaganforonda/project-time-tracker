const axios = require("axios");

module.exports = {
  updateUserInfo: (req, res) => {
    const dbInstance = req.app.get("db");
    const { userid } = req.params;
    const {
      first_name,
      last_name,
      email,
      phone,
      address_one,
      address_two,
      city,
      state,
      zip,
      country,
      website
    } = req.body;

    dbInstance
      .UPDATE_USER_INFO([
        userid,
        first_name,
        last_name,
        email,
        phone,
        address_one,
        address_two,
        city,
        state,
        country,
        website,
        zip
      ])
      .then(result => {
        res.status(200).send(result);
      })
      .catch(e => {
        console.log(`Error PUT while updating user info: ${e}`);
        res.sendStatus(500);
      });
  }
};
