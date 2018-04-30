import axios from 'axios';

// GET ALL ACTIVE JOBS - LOGGED IN USER ONLY
export function getAllActiveJobs(userId) {
    console.log(userId);
    let jobsData = axios.get(`http://localhost:3005/api/jobs/open/${userId}`).then((jobs) => {
        return jobs.data
    }).catch((e) => {
        console.log(`Error: ${e}`);
    });


    return jobsData;

}


export function addJob(job){
    let newJob = axios.post(`http://localhost:3005/api/job`, (job)).then((result) => {
      return result.data
    }).catch((e) => {
      console.log(`${e}`)
    })

    return newJob;
}