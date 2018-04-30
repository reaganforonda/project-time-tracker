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
      billed
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
        billed
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
      .GET_ENTRY_ID([jobid, userid, entryid])
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
    const { end_time, duration } = req.body;

    dbInstance
      .UPDATE_ENTRY([end_time, duration, userid, jobid, entryid])
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
  }
}
