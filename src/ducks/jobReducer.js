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
  allJobs: [],
  offTheClockJobs: [],
  jobOnClock: {},
  clockInTime: "",
  clockOutTime: "",
  clockedIn: false,
  newJob: {},
  open: false,
  active : {}
};

const UPDATE_CLOCK_IN_TIME = "UPDATE_CLOCK_IN_TIME";
const CLOCK_IN_JOB = "CLOCK_IN_JOB";
const CLOCK_OUT_JOB = "CLOCK_OUT_JOB";
const GET_ACTIVE_JOBS = "GET_ACTIVE_JOBS";
const ADD_JOB = "ADD_JOB";
const MODAL_OPEN = "MODAL_OEPN";
const MODAL_CLOSE = "MODAL_CLOSE";
const GET_CLOCKED_IN_JOB = "SET_CLOCKED_IN_JOB";
const RESET_CLOCK_IN_JOB = "RESET_CLOCK_IN_JOB";
const UPDATE_OFF_THE_CLOCK_JOBS = "UPDATE_OFF_THE_CLOCK_JOBS";
const GET_OFF_THE_CLOCK_JOBS = "GET_OFF_THE_CLOCK_JOBS";
const UPDATE_START_TIME = 'UPDATE_START_TIME';


export function updateStartTime(time) {

  return {
    type : UPDATE_START_TIME,
    payload : time
  }
} 

export function getClockedInJob(user_id) {
  let clockIn = axios
    .get(`/api/jobs/clockin/${user_id}`)
    .then(result => {
      return result.data[0];
    })
    .catch(e => {
      console.log(`Error while trying to Get Clocked In Job: ${e}`);
    });

  return {
    type: GET_CLOCKED_IN_JOB,
    payload: clockIn
  };
}

export function getOffTheClockJobs(user_id) {
  let jobs = axios
    .get(`/api/jobs/clockout/${user_id}`)
    .then(result => {
      return result.data;
    })
    .catch(e => {
      console.log(`${e}`);
    });

  return {
    type: GET_OFF_THE_CLOCK_JOBS,
    payload: jobs
  };
}

export function clockOutJob(job) {



  return {
    type: RESET_CLOCK_IN_JOB,
    payload: {}
  };
}

// GET ALL ACTIVE JOBS - USING LOGGED IN USER ID
export function getAllActiveJobs(userId) {
  let jobsData = axios
    .get(`/api/jobs/open/${userId}`)
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

export function openModal() {
  return {
    type: MODAL_OPEN,
    payload: true
  };
}

export function closeModal() {
  return {
    type: MODAL_CLOSE,
    payload: false
  };
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

    case MODAL_OPEN:
      return Object.assign({}, state, { open: action.payload });

    case MODAL_CLOSE:
      return Object.assign({}, state, { open: action.payload });

    case GET_ACTIVE_JOBS + "_FULFILLED":
      return Object.assign({}, state, { allJobs: action.payload });

    case RESET_CLOCK_IN_JOB:
      return Object.assign({}, state, { jobOnClock: action.payload });

    case UPDATE_OFF_THE_CLOCK_JOBS:
      return Object.assign({}, state, { offTheClockJobs: action.payload });

    case GET_OFF_THE_CLOCK_JOBS + "_FULFILLED":
      return Object.assign({}, state, { offTheClockJobs: action.payload });

      case GET_CLOCKED_IN_JOB +"_FULFILLED":
      return Object.assign({}, state, {jobOnClock : action.payload})

      case UPDATE_START_TIME :      
      return Object.assign({}, state, {clockInTime : action.payload})

    default:
      return state;
  }
}
