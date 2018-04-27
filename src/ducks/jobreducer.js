import axios from "axios";
import * as jobServices from '../services/jobservices';


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
  jobs: [],
  clockInTime : '',
  clockOutTime: '',
  clockedIn : false,

};

const GET_ALL_JOBS = "GET_ALL_JOBS";
const ADD_JOB = "ADD_JOB";
const UPDATE_CLOCK_IN_TIME = "UPDATE_CLOCK_IN_TIME";
const UPDATE_CLOCK_OUT_TIME = "UPDATE_CLOCK_OUT_TIME";
const CLOCK_IN_JOB = "CLOCK_IN_JOB";
const CLOCK_OUT_JOB = "CLOCK_OUT_JOB"

const GET_ACTIVE_JOBS_PENDING = "GET_ACTIVE_JOBS_PENDING";





// GET ALL ACTIVE JOBS - USING LOGGED IN USER ID
export function getAllActiveJobs(userId) {
  let openJobsData = axios
    .get(`/api/jobs/open/${userId}`)
    .then(jobs => {
      return jobs.data;
    })
    .catch(e => {
      console.log(`Error: ${e}`);
    });

  return {
    type: GET_ALL_JOBS,
    payload: openJobsData
  };
}

export function addJob(){
// TODO:
}


export function updateClockIn(clockInTime){
  
  return {
    type : UPDATE_CLOCK_IN_TIME,
    payload : clockInTime
  }
}

export function clockIn(){
  console.log("Hit Me");
  return {
    type : CLOCK_IN_JOB,
    payload : true
  }
}


export function clockOut(){
  return {
    type : CLOCK_OUT_JOB,
    payload : false
  }
}

export default function jobReducer(state = JOB_INITIAL_STATE, action) {
  console.log(state.clockedIn)
  switch (action.type) {
      case GET_ALL_JOBS:
      let obj = Object.assign({}, state, {jobs : action.payload});
      return (
          obj.jobs
      )
      
      case UPDATE_CLOCK_IN_TIME:
      return Object.assign({}, state, {clockInTime : action.payload});

      case CLOCK_IN_JOB : 
      return Object.assign({}, state, {clockedIn : action.payload});

      case CLOCK_OUT_JOB:
      return Object.assign({}, state, {clockedIn : action.payload})

      
    default:
      return state;
  }
}
