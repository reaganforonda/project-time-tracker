module.exports = {
    addEntry : (req, res) => {
        const dbInstance = req.app.get('db');
        const {user_id, job_id, client_id, entry_date, start_time, end_time, duration, comment, billed} = req.body;

        dbInstance.ADD_ENTRY([user_id, job_id, client_id, entry_date, start_time, end_time, duration, comment, billed]).then((entry) => {
            res.status(200).send(entry[0]);
        }).catch((e) => {
            console.log(`Error: ${e}`);
            res.sendStatus(500);
        })
    },

    getAllEnteries : (req, res) => {
        const dbInstance = req.app.get('db');
        const {userid} = req.params

        dbInstance.GET_ENTRY_USER_ID([userid]).then((enteries) => {
            res.status(200).send(enteries);
        }).catch((e) => {
            console.log(`Error: ${e}`);
            res.sendStatus(500);
        })
    }
}