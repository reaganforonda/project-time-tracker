const axios = require('axios');



module.exports = {
    addJob : (req, res) => {
        const dbInstance = req.app.get('db');
        const {client_id, user_id, job_name,  start_date, completed, rate, description} = req.body;

        dbInstance.ADD_JOB([client_id, user_id, job_name, start_date, completed, rate, description]).then((result) => {
            res.status(200).send(result[0]);
        }).catch((e) => {
            console.log(`Error: ${e}`);
            res.sendStatus(500);
        })
    },

    getAllJobs : (req, res) => {
        const dbInstance = req.app.get('db');
        const {userId} = req.params

        dbInstance.GET_ALL_JOBS().then((result) => {
            res.status(200).send(result);
        }).catch((e) => {
            console.log(`Error: ${e}`);
            res.sendStatus(500);
        })
    },

    getAllCompletedJobs : (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.GET_ALL_JOBS_COMPLETE().then((jobs) => {
            res.status(200).send(jobs);
        }).catch((e) => {
            console.log(`Errors : ${e}`);
            res.sendStatus(500);
        })
    },

    getAllOpenJobs : (req, res) => {
        const dbInstance = req.app.get('db');
        const {userId} = req.params;

        dbInstance.GET_ALL_JOBS_IN_PROGRESS([userId]).then((jobs) => {
            res.status(200).send(jobs);
        }).catch((e) => {

            console.log(`Errors : ${e}`);
            res.sendStatus(500);
        })
    },

    getJobsByUserID : (req, res) => {
        const dbInstance = req.app.get('db');
        const {userId} = req.params

        dbInstance.GET_JOBS_USERID([userId]).then((jobs)=> {
                res.status(200).send(jobs);
        }).catch((e) => {
            console.log(`Errors; ${e}`);
            res.sendStatus(500);
        })
    },

    getJobsForBilling : (req, res) => {
        const dbInstance = req.app.get('db');
        const {userid} = req.params

        dbInstance.GET_JOB_TOTALS([userid]).then((result) => {
            res.status(200).send(result);
        }).catch((e) => {
            console.log(`Error while trying to get totals for billing: ${e}`);
            res.sendStatus(500);
        })
    },

    updateJobsBilling : (req, res) => {
        const dbInstance = req.app.get('db');
        const {userid, jobid} = req.params
        const {end_date} = req.body

        dbInstance.UPDATE_JOB_BILLING([end_date]).then((result) => {
            res.status(200).send(result);
        }).catch((e) => {
            console.log(`Error while trying to update for billing : ${e}`);
            res.sendStatus(500);
        })
    }
}