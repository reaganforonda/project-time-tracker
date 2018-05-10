require("dotenv").config();

const express = require("express"),
  massive = require("massive"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  userController = require("./controllers/userController"),
  session = require("express-session"),
  passport = require("passport"),
  Auth0Strategy = require("passport-auth0");

const jobsController = require("./controllers/jobsController"),
  clientController = require("./controllers/clientController"),
  mailController = require('./controllers/mailController'),
  s3Controller = require('./controllers/s3Controller'),
  billingController = require('./controllers/billingController'),
  entryController = require('./controllers/entryController');

const app = express();
const nodemailer = require('nodemailer')

// .env Desconstructor
const {
  CONNECTION_STRING,
  CONNECTION_PORT,
  SESSION_SECRET,
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  CALLBACK_URL,
} = process.env;

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + '/../build'));

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
    successRedirect: "http://localhost:3005/#/dashboard",
    failureRedirect: "http://localhost:3005"
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
  res.redirect("http://localhost:3005");
});


// ###### ENDPOINTS - EMAIL ######
app.post(`/api/email`, mailController.sendEmail)

// ##### Amazon S3 #####
app.post(`/api/s3/upload`, s3Controller.sign)

// ###### ENDPOINTS - JOB ######
app.post('/api/job', jobsController.addJob);
app.get('/api/jobs/open/:userId', jobsController.getAllOpenJobs)
app.put('/api/jobs/updateclock/:userid/:jobid/:clock', jobsController.updateClockInJob)
app.get('/api/jobs/clockin/:userid/', jobsController.getClockedInJobs)
app.get('/api/jobs/clockout/:userid/', jobsController.getClockedOutJobs)
app.get('/api/jobs/:userId', jobsController.getJobsByUserID)
app.get('/api/jobs/billing/:userid', jobsController.getJobsForBilling)
app.put('/api/jobs/billing/update/:userid/:jobid', jobsController.updateJobsBilling)



// ###### ENDPOINTS - Client ######
app.get('/api/clients/:userid', clientController.getAllClients);
app.post('/api/client/', clientController.addClient);
app.delete('/api/client/:userid/:clientid', clientController.deleteClient);
app.put('/api/client/update/:userid/:clientid', clientController.updateClient);

// ###### ENDPOINTS - Enteries ######
app.post('/api/entry/add', entryController.addEntry)

app.put(`/api/entry/update/:jobid/:userid/:entryid`, entryController.updateEntry)
app.put('/api/entry/fullupdate/:userid/:entryid/:jobid', entryController.updateFullEntry);

app.get('/api/entry/:userid/:jobid', entryController.getEntriesByJobId)
app.get('/api/entry/total/:userid/:jobid', entryController.getTotalByJobId)
app.get('/api/entry/:userid', entryController.getAllEnteries)
app.get('/api/entry/hrs/total/:userid/:jobid', entryController.getTotalHrsByJobId)
app.get('/api/entry/:userid/:jobid/:entryid', entryController.getEntryById)

app.delete('/api/entry/delete/:userid/:entryid', entryController.deleteEntry)

// ###### ENDPOINTS - User ######
app.put('/api/user/update/:userid', userController.updateUserInfo)

// ###### ENDPOINTS - Billing ######
app.get('/api/billing/invoiceid/:userid', billingController.getLastBillingNumber)
app.post('/api/billing/add/:userid', billingController.addBilling)
app.put('/api/billing/update/invoice/:userid/:invoiceid', billingController.updateInvoiceLocation)


// START SERVER
app.listen(CONNECTION_PORT, () => {
  console.log(`Creeping on Port: ${CONNECTION_PORT}`);
});