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
  mailController = require("./controllers/mailController"),
  analyticsController = require('./controllers/analyticsController'),
  s3Controller = require("./controllers/s3Controller"),
  billingController = require("./controllers/billingController"),
  googleController = require('./controllers/googleController')
  entryController = require("./controllers/entryController");

const app = express();
const nodemailer = require("nodemailer");

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

app.use(express.static(__dirname + "/../build"));
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
            })
            .catch(e => {
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
    })
    .catch(e => {
      console.log(`Error : ${e}`);
    });
});

app.get("/auth", passport.authenticate("auth0"));

if (process.env.NODE_ENV === "development") {
  app.get(
    "/auth/callback",
    passport.authenticate("auth0", {
      successRedirect: "http://localhost:3000/#/dashboard",
      failureRedirect: "http://localhost:3000"
    })
  );
} else {
  app.get(
    "/auth/callback",
    passport.authenticate("auth0", {
      successRedirect: process.env.REACT_SUCCESS_REDIRECT,
      failureRedirect: process.env.REACT_FAILURE_REDIRECT
    })
  );
}

app.get("/auth/me", function(req, res) {
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.status(401).send(console.log("Error 401"));
  }
});

if (process.env.NODE_ENV === "development") {
  app.get("/logout", function(req, res) {
    req.logOut();
    res.redirect("http://localhost:3000");
  });
} else {
  app.get("/logout", function(req, res) {
    req.logOut();
    res.redirect(process.env.REACT_LOGOUT_REDIRECT);
  });
}

// ###### ENDPOINTS - EMAIL ######
app.post(`/api/email`, mailController.sendEmail);

// ##### Amazon S3 #####
app.post(`/api/s3/upload`, s3Controller.sign);
app.put("/api/s3/update/:user_id/:jobid");

// ###### ENDPOINTS - JOB ######
app.get("/api/jobs/open/:userId", jobsController.getAllOpenJobs);
app.get("/api/jobs/clockin/:userid/", jobsController.getClockedInJobs);
app.get("/api/jobs/clockout/:userid/", jobsController.getClockedOutJobs);
app.get("/api/jobs/:userId", jobsController.getJobsByUserID);
app.get("/api/jobs/billing/:userid", jobsController.getJobsForBilling);
app.post("/api/job", jobsController.addJob);
app.put(
  "/api/jobs/billing/update/:userid/:jobid",
  jobsController.updateJobsBilling
);
app.put(
  "/api/jobs/updateclock/:userid/:jobid/:clock",
  jobsController.updateClockInJob
);

// ###### ENDPOINTS - Client ######
app.get("/api/clients/:userid", clientController.getAllClients);
app.post("/api/client/", clientController.addClient);
app.delete("/api/client/:userid/:clientid", clientController.deleteClient);
app.put("/api/client/update/:userid/:clientid", clientController.updateClient);

// ###### ENDPOINTS - Enteries ######
app.post("/api/entry/add", entryController.addEntry);

app.put(
  `/api/entry/update/:jobid/:userid/:entryid`,
  entryController.updateEntry
);
app.put(
  "/api/entry/fullupdate/:userid/:entryid/:jobid",
  entryController.updateFullEntry
);

app.get("/api/entry/:userid/:jobid", entryController.getEntriesByJobId);
app.get("/api/entry/total/:userid/:jobid", entryController.getTotalByJobId);
app.get("/api/entry/:userid", entryController.getAllEnteries);
app.get(
  "/api/entry/hrs/total/:userid/:jobid",
  entryController.getTotalHrsByJobId
);
app.get("/api/entry/:userid/:jobid/:entryid", entryController.getEntryById);

app.delete("/api/entry/delete/:userid/:entryid", entryController.deleteEntry);

// ###### ENDPOINTS - User ######
app.put("/api/user/update/:userid", userController.updateUserInfo);

// ###### ENDPOINTS - Billing ######
app.get("/api/billing/:userid", billingController.getAllBilling);
app.get(
  "/api/billing/invoiceid/:userid",
  billingController.getLastBillingNumber
);
app.post("/api/billing/add/:userid", billingController.addBilling);
app.put(
  "/api/billing/update/invoice/:userid/:invoiceid",
  billingController.updateInvoiceLocation
);

// ###### ENDPOINTS - Analytics ######
app.get("/api/data/jobs/progresscount/:userid", analyticsController.getJobsInProgressCount)
app.get("/api/data/jobs/progress/total/:userid", analyticsController.getJobsInProgressTotal)
app.get('/api/data/jobs/clientotal/:userid', analyticsController.getTotalsClient)
app.get('/api/data/jobs/hrsmonthly/:userid', analyticsController.getHrsMonthly)
app.get('/api/data/jobs/revmonthly/:userid', analyticsController.getRevMonthly)


// ###### ENDPOINTS - GOOGLE ######
app.post('/api/google/geocoding', googleController.getGeolocation)

// START SERVER
app.listen(CONNECTION_PORT, () => {
  console.log(`Creeping on Port: ${CONNECTION_PORT}`);
});
