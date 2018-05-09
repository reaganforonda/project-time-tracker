const axios = require("axios");

module.exports = {
  addJob: (req, res) => {
    const dbInstance = req.app.get("db");
    const {
      client_id,
      user_id,
      job_name,
      start_date,
      completed,
      rate,
      description
    } = req.body;

    dbInstance
      .ADD_JOB([
        client_id,
        user_id,
        job_name,
        start_date,
        completed,
        rate,
        description
      ])
      .then(result => {
        res.status(200).send(result[0]);
      })
      .catch(e => {
        console.log(`Error: ${e}`);
        res.sendStatus(500);
      });
  },

  getAllJobs: (req, res) => {
    const dbInstance = req.app.get("db");
    const { userId } = req.params;

    dbInstance
      .GET_ALL_JOBS()
      .then(result => {
        res.status(200).send(result);
      })
      .catch(e => {
        console.log(`Error: ${e}`);
        res.sendStatus(500);
      });
  },

  getClockedInJobs: (req, res) => {
    const dbInstance = req.app.get("db");
    const { userid } = req.params;
    dbInstance
      .GET_CLOCKED_IN_JOB([userid])
      .then(result => {
        res.status(200).send(result);
      })
      .catch(e => {
        console.log(`Server Error while trying to get Clocked In Job : ${e}`);
        res.sendStatus(500);
      });
  },

  getClockedOutJobs: (req, res) => {
    const dbInstance = req.app.get("db");
    const { userid } = req.params;

    dbInstance
      .GET_CLOCK_OUT_JOBS([userid])
      .then(result => {
        res.status(200).send(result);
      })
      .catch(e => {
        console.log(`Server Error while trying to get Clocked Out Job : ${e}`);
        res.sendStatus(500);
      });
  },

  updateClockInJob : (req, res) => {
      const dbInstance = req.app.get('db');
      const {userid, clock, jobid} = req.params;
      dbInstance.UPDATE_CLOCK_IN_JOB([userid, jobid, clock]).then(result => {
          res.status(200).send(result);
      }).catch(e => {
          console.log(`Server Error while trying to update Clocked in Job : ${e}`);
          res.sendStatus(500)
      })
  },

  getAllCompletedJobs: (req, res) => {
    const dbInstance = req.app.get("db");

    dbInstance
      .GET_ALL_JOBS_COMPLETE()
      .then(jobs => {
        res.status(200).send(jobs);
      })
      .catch(e => {
        console.log(`Errors : ${e}`);
        res.sendStatus(500);
      });
  },

  getAllOpenJobs: (req, res) => {
    const dbInstance = req.app.get("db");
    const { userId } = req.params;

    dbInstance
      .GET_ALL_JOBS_IN_PROGRESS([userId])
      .then(jobs => {
        res.status(200).send(jobs);
      })
      .catch(e => {
        console.log(`Errors : ${e}`);
        res.sendStatus(500);
      });
  },

  getJobsByUserID: (req, res) => {
    const dbInstance = req.app.get("db");
    const { userId } = req.params;

    dbInstance
      .GET_JOBS_USERID([userId])
      .then(jobs => {
        res.status(200).send(jobs);
      })
      .catch(e => {
        console.log(`Errors; ${e}`);
        res.sendStatus(500);
      });
  },

  getJobsForBilling: (req, res) => {
    const dbInstance = req.app.get("db");
    const { userid } = req.params;

    dbInstance
      .GET_JOB_TOTALS([userid])
      .then(result => {
        res.status(200).send(result);
      })
      .catch(e => {
        console.log(`Error while trying to get totals for billing: ${e}`);
        res.sendStatus(500);
      });
  },

  updateJobsBilling: (req, res) => {
    const dbInstance = req.app.get("db");
    const { userid, jobid } = req.params;
    const { end_date } = req.body;
    console.log(end_date);
    dbInstance
      .UPDATE_JOB_BILLING([end_date, userid, jobid])
      .then(result => {
        res.status(200).send(result);
      })
      .catch(e => {
        console.log(`Error while trying to update for billing : ${e}`);
        res.sendStatus(500);
      });
  }
};
