import axios from "axios";

const JOB_INITIAL_STATE = {
  job_id: 0,
  client_id: 0,
  user_id: 0,
  job_name: "",
  start_date: "",
  end_date: "",
  completed: false,
  rate: 0,
  description: "",
  jobs: []
};

const GET_ALL_JOBS = "GET_ALL_JOBS";
const ADD_JOB = "ADD_JOB";

export function getAllJobs() {
  let jobsData = axios
    .get("/api/jobs")
    .then(jobs => {
      return jobs.data;
    })
    .catch(e => {
      console.log(`Error: ${e}`);
    });

  return {
    type: GET_ALL_JOBS,
    payload: jobsData
  };
}

export function addJob(){

}

export default function jobReducer(state = JOB_INITIAL_STATE, action) {
  switch (action.type) {
      case GET_ALL_JOBS:
      let obj = Object.assign({}, state, {jobs : action.payload});
      return (
          obj.jobs
      ) 
    default:
      return state;
  }
}
