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
  jobOnClock : {},
  clockInTime : '',
  clockOutTime: '',
  clockedIn : false,
  newJob : {}
};

const GET_ALL_JOBS = "GET_ALL_JOBS";
const UPDATE_CLOCK_IN_TIME = "UPDATE_CLOCK_IN_TIME";
const UPDATE_CLOCK_OUT_TIME = "UPDATE_CLOCK_OUT_TIME";
const CLOCK_IN_JOB = "CLOCK_IN_JOB";
const CLOCK_OUT_JOB = "CLOCK_OUT_JOB"

const GET_ACTIVE_JOBS = "GET_ACTIVE_JOBS"
const ADD_JOB = "ADD_JOB";





// GET ALL ACTIVE JOBS - USING LOGGED IN USER ID
export function getAllActiveJobs(userId) {
  return {
    type : GET_ACTIVE_JOBS,
    payload : jobServices.getAllActiveJobs(userId)
  }
}

export function addJob(job) { 
  return {
    type : ADD_JOB,
    payload : jobServices.addJob(job)
  }
}


// ########





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

  switch (action.type) {
      case GET_ACTIVE_JOBS:
      console.log(action.payload)

      case ADD_JOB:
      return Object.assign({}, state, {newJob : action.payload})
      
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
