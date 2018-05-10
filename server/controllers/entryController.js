module.exports = {
  addEntry: (req, res) => {
    const dbInstance = req.app.get("db");
    const {
      user_id,
      job_id,
      client_id,
      entry_date,
      start_time,
      end_time,
      duration,
      comment,
      billed,
      total
    } = req.body;

    dbInstance
      .ADD_ENTRY([
        user_id,
        job_id,
        client_id,
        entry_date,
        start_time,
        end_time,
        duration,
        comment,
        billed,
        total
      ])
      .then(entry => {
        res.status(200).send(entry[0]);
      })
      .catch(e => {
        console.log(`Error: ${e}`);
        res.sendStatus(500);
      });
  },

  getAllEnteries: (req, res) => {
    const dbInstance = req.app.get("db");
    const { userid } = req.params;

    dbInstance
      .GET_ENTRY_USER_ID([userid])
      .then(enteries => {
        res.status(200).send(enteries);
      })
      .catch(e => {
        console.log(`Error: ${e}`);
        res.sendStatus(500);
      });
  },

  getEntryById: (req, res) => {
    const dbInstance = req.app.get("db");
    const { jobid, userid, entryid } = req.params;

    dbInstance
      .GET_ENTRY_BY_ID([jobid, userid, entryid])
      .then(entry => {
        res.status(200).send(entry);
      })
      .catch(e => {
        console.log(`Error: ${e}`);
        res.sendStatus(500);
      });
  },

  updateEntry: (req, res) => {
    const dbInstance = req.app.get("db");
    const { jobid, userid, entryid } = req.params;
    const { end_time, duration, total } = req.body;

    dbInstance
      .UPDATE_ENTRY([end_time, duration, userid, jobid, entryid, total])
      .then(result => {
        res.status(200).send(result);
      })
      .catch(e => {
        console.log(`Error: ${e}`);
        res.sendStatus(500);
      });
  },

  deleteEntry : (req, res) => {
      const dbInstance = req.app.get('db');
      const {userid, entryid} = req.params;

      dbInstance.DELETE_ENTRY([entryid, userid]).then((result) => {
          res.status(200).send(result);
      }).catch((e) => {
          console.log(`Error: ${e}`);
          res.sendStatus(500);
      })
  },

  getEntriesByJobId : (req, res) => {
    const dbInstance = req.app.get('db');
    const {userid, jobid} = req.params;

    dbInstance.GET_ENTRIES_BY_JOB_ID([userid, jobid]).then((result) => {
      res.status(200).send(result)
    }).catch((e) => {
      console.log(`Error with GET request for Entries by Job Id : ${e}`);
      res.sendStatus(500);
    })
  },

  getTotalByJobId : (req, res) => {
    const dbInstance = req.app.get('db');
    const {userid, jobid} = req.params;

    dbInstance.GET_ENTRY_TOTAL_JOBID([jobid, userid]).then((result) => {
      res.status(200).send(result)
    }).catch((e) => {
      console.log(`Error with GET request for Total of Entries: ${e}`);
      res.sendStatus(500);
    })
  },

  getTotalHrsByJobId : (req, res) => {
    const dbInstance = req.app.get('db');
    const {userid, jobid} = req.params;

    dbInstance.GET_ENTRY_TOTAL_HRS([userid, jobid]).then((result) => {
      res.status(200).send(result)
    }).catch((e) => {
      console.log(`Error with GET request for Total Hrs: ${e}`);
      res.sendStatus(500);
    })
  },

  updateFullEntry : (req, res) => {
    const dbInstance = req.app.get('db');
    const {userid, jobid, entryid} = req.params;
    const {entry_date, start_time, end_time, duration, total, comment} = req.body;

    dbInstance.UPDATE_FULL_ENTRY([entry_date, start_time, end_time, duration, total, comment, userid, entryid, jobid]).then((result) => {
      res.status(200).send(result);
    }).catch((e) => {
      console.log(`Error with PUT: Trying to update entry: ${e}`);
      res.sendStatus(500);
    })
  }
}
