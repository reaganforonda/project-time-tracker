require("dotenv").config();

const express = require("express"),
  massive = require("massive"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  controller = require("./controllers/controller"),
  session = require("express-session"),
  passport = require("passport"),
  Auth0Strategy = require("passport-auth0");

const jobsController = require("./controllers/jobsController"),
  clientController = require("./controllers/clientController"),
  entryController = require('./controllers/entryController');

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

// ### STAY LOGGED IN
// app.use((req, res, next)=>{
//   if(process.env.DEV_MODE){
//       req.user = {
//           user_id: 1,
//           auth_id: "test-user-1",
//           first_name : "Bob",
//           last_name : "Belcher"
//       }
//   }
// })



// ###### DB Connection ######
massive(CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(e => console.log(`Error: ${e}`));

app.use(passport.initialize());
app.use(passport.session());

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

    function(accessToken, refreshToken, extraParams, profile, done) {
      const db = app.get("db");

      const { id, displayName, picture, given_name, family_name } = profile;

      db.FIND_USER_AUTH([id]).then(users => {

        if (users[0]) {
          console.log(users[0]);
          return done(null, users[0].auth_id);
        } else {
          db
            .CREATE_USER([id, displayName, picture, given_name, family_name])
            .then(createdUser => {
              
              return done(null, createdUser[0].auth_id);
            }).catch((e) => {
              console.log(`Error at Creating User: ${e}`);
            });
        }
      });
    }
  )
);

passport.serializeUser((id, done) => {
  // Putting info in session
  return done(null, id);
});

passport.deserializeUser((id, done) => {
  app
    .get("db")
    .FIND_USER_SESSION([id])
    .then(user => {
      done(null, user[0]);
    }).catch((e)=> {
      console.log(`Error : ${e}`);
    });
});

app.get("/auth", passport.authenticate("auth0"));

app.get(
  "/auth/callback",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/dashboard",
    failureRedirect: "http://localhost:3000"
  })
);

app.get("/auth/me", function(req, res) {
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.status(401).send(console.log("Error 401"));
  }
});

app.get("/logout", function(req, res) {
  req.logOut();
  res.redirect("http://localhost:3000");
});

// ###### ENDPOINTS - JOB ######
app.post('/api/job', jobsController.addJob);
app.get('/api/jobs', jobsController.getAllJobs)
app.get('/api/jobs/open', jobsController.getAllOpenJobs)
app.get('/api/jobs/:userId', jobsController.getJobsByUserID)
app.get('/api/jobs/:clientId', )

// ###### ENDPOINTS - Client ######
app.get('/api/clients', clientController.getAllClients);
app.post('/api/client/', clientController.addClient);
app.delete('/api/client/:userid/:clientid', clientController.deleteClient);


// ###### ENDPOINTS - Enteries ######
app.post('/api/entry/add', entryController.addEntry)
app.get('/api/entry/:userid', entryController.getAllEnteries)

app.listen(CONNECTION_PORT, () => {
  console.log(`Creeping on Port: ${CONNECTION_PORT}`);
});
