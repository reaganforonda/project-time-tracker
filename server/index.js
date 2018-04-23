require("dotenv").config();

const express = require("express"),
  massive = require("massive"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  controller = require("./controller.js"),
  session = require("express-session"),
  passport = require("passport"),
  Auth0Strategy = require("passport-auth0");

const app = express();

// .env Desconstructor
const {
  CONNECTION_STRING,
  CONNECTION_PORT,
  SESSION_SECRET,
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  CALLBACK_URL
} = process.env;

app.use(bodyParser.json());
app.use(cors());

// ######################
// ###### SESSIONS ######
// ######################
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

massive(CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(e => console.log(`Error: ${e}`));

// #######################
// ###### ENDPOINTS ######
// #######################

app.listen(CONNECTION_PORT, () => {
  console.log(`Creeping on Port: ${CONNECTION_PORT}`);
});
