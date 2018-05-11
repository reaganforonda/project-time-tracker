module.exports = {
    getJobsInProgressCount : (req, res) => {
        dbInstance = req.app.get('db');
        const {userid} = req.params;

        dbInstance.DATA_JOBS_PROGRESS_CNT([userid]).then((result) => {
            res.status(200).send(result)
        }).catch((e) => {
            console.log(`Server Error while trying to access DB: ${e}`)
            res.sendStatus(500);
        })
    },

    getJobsInProgressTotal : (req, res) => {
        dbInstance = req.app.get('db');
        const {userid} = req.params;

        dbInstance.DATA_JOBS_PROGRESS_TOTAL([userid]).then((result) => {
            res.status(200).send(result);
        }).catch((e) => {
            console.log(`Server Error while trying to access DB: ${e}`)
            res.sendStatus(500);
        })
    }
}