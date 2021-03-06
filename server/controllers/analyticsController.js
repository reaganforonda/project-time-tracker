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
    },

    getTotalsClient : (req, res) => {
        dbInstance = req.app.get('db');
        const {userid} = req.params;

        dbInstance.DATA_TOTALS_CLIENT([userid]).then((result) => {
            res.status(200).send(result);
        }).catch((e) => {
            console.log(`Server Error while trying to access DB: ${e}`)
            res.sendStatus(500);
        })
    },

    getHrsMonthly : (req, res) => {
        dbInstance = req.app.get('db');
        const {userid} = req.params;

        dbInstance.DATA_HRS_MONTHLY([userid]).then((result) => {
            res.status(200).send(result);
        }).catch((e) => {
            console.log(`Server Error while trying to access DB: ${e}`);
            res.sendStatus(500);
        })
    },

    getRevMonthly : (req, res) => {
        dbInstance = req.app.get('db');
        const {userid} = req.params;

        dbInstance.DATA_REVENUE_MONTHLY([userid]).then((result) => {
            res.status(200).send(result);
        }).catch((e) => {
            console.log(`Server Error while trying to access DB: ${e}`);
            res.sendStatus(500);
        })
    }
}