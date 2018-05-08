import axios from "axios";
import * as jobServices from "../services/jobservices";

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
  jobOnClock: {},
  clockInTime: "",
  clockOutTime: "",
  clockedIn: false,
  newJob: {},
  open: false
};

// const GET_ALL_JOBS = "GET_ALL_JOBS"; TODO: REMOVE
const UPDATE_CLOCK_IN_TIME = "UPDATE_CLOCK_IN_TIME";
// const UPDATE_CLOCK_OUT_TIME = "UPDATE_CLOCK_OUT_TIME"; TODO: REMOVE
const CLOCK_IN_JOB = "CLOCK_IN_JOB";
const CLOCK_OUT_JOB = "CLOCK_OUT_JOB";

const GET_ACTIVE_JOBS = "GET_ACTIVE_JOBS";
const ADD_JOB = "ADD_JOB";

const MODAL_OPEN = "MODAL_OEPN";
const MODAL_CLOSE = "MODAL_CLOSE";

// GET ALL ACTIVE JOBS - USING LOGGED IN USER ID
export function getAllActiveJobs(userId) {
  let jobsData = axios
    .get(`http://localhost:3005/api/jobs/open/${userId}`)
    .then(jobs => {
      return jobs.data;
    })
    .catch(e => {
      console.log(`Error: ${e}`);
    });

  return {
    type: GET_ACTIVE_JOBS,
    payload: jobsData
  };
}

export function addJob(job) {
  return {
    type: ADD_JOB,
    payload: jobServices.addJob(job)
  };
}

export function openModal(){
  return {
    type: MODAL_OPEN,
    payload: true,
  }
}

export function closeModal(){
  return {
    type : MODAL_CLOSE,
    payload : false
  }
}

// ########

export function updateClockIn(clockInTime) {
  return {
    type: UPDATE_CLOCK_IN_TIME,
    payload: clockInTime
  };
}

export function clockIn() {
  return {
    type: CLOCK_IN_JOB,
    payload: true
  };
}

export function clockOut() {
  return {
    type: CLOCK_OUT_JOB,
    payload: false
  };
}

export default function jobReducer(state = JOB_INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_JOB:
      return Object.assign({}, state, { newJob: action.payload });

    case UPDATE_CLOCK_IN_TIME:
      return Object.assign({}, state, { clockInTime: action.payload });

    case CLOCK_IN_JOB:
      return Object.assign({}, state, { clockedIn: action.payload });

    case CLOCK_OUT_JOB:
      return Object.assign({}, state, { clockedIn: action.payload });

      case MODAL_OPEN : 
      return Object.assign({}, state, { open : action.payload})
      
      case MODAL_CLOSE : 
      return Object.assign({}, state, {open : action.payload})

    default:
      return state;
  }
}
