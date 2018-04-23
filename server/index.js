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

// ###### SESSIONS ######
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);


// ###### DB Connection ######
massive(CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(e => console.log(`Error: ${e}`));

// ###### Auth0 Connection ######
passport.use(
  new Auth0Strategy(
    {
      domain: DOMAIN,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      scope: "openid profile"
    },

    function(accessToken, refreshToken, extraParams, profile, done){
      const db = app.get('db');
      const {id, displayName, picture} = profile;

      db.FIND_USER_AUTH([id]).then(users => {
        if(users[0]){
          return done(null, users[0].id);
        }
        else {
          db.CREATE_USER([id, displayName, picture]).then(createdUser => {
            return done(null, createdUser[0].id);
          })
        }
      })
    }
  )
);

passport.serializeUser((id, done) => {
  return done(null, id);
});

passport.deserializeUser((id, done) => {
  app.get('db').FIND_SESSION_USER([id].then((user) => {
    done(null, user[0]);
  }))
})

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: "http://localhost:3000/#/main",
  failureRedirect: "http://localhost:3000"
}));

app.get("/auth/me", function(req, res) {
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.status(401).send(console.log('Get to the choppa'));
  }
});


app.get('/logout', function(req, res){
  req.logOut();
  res.redirect('http://localhost:3000')
});


// ###### ENDPOINTS ######

app.listen(CONNECTION_PORT, () => {
  console.log(`Creeping on Port: ${CONNECTION_PORT}`);
});
