import axios from "axios";
import * as entryServices from "../services/entryservices";

const ENTRY_INTIAL_STATE = {
  client_id: 0,
  job_id: 0,
  job_name: "",
  client_name: "",
  entry_date: "",
  start_time: "",
  end_time: "",
  duration: "",
  comment: "",
  billed: false,
  entries: [],
  total: 0,
  totalHrs: 0,
  entry: {},
  activeEntry: {}
};

const UPDATE_CLIENT_ID = "UPDATE_CLIENT_ID";
const UPDATE_JOB_ID = "UPDATE_JOB_ID";
const UPDATE_JOB_NAME = "UPDATE_JOB_NAME";
const UPDATE_CLIENT_NAME = "UPDATE_CLIENT_NAME";
const UPDATE_ENTRY_DATE = "UPDATE_ENTRY_DATE";
const UPDATE_START_TIME = "UPDATE_START_TIME";
const UPDATE_END_TIME = "UPDATE_END_TIME";
const UPDATE_DURATION = "UPDATE_DURATION";
const UPDATE_COMMENT = "UPDATE_COMMENT";
const UPDATE_BILLED = "UPDATE_BILLED";
const ADD_NEW_ENTRY = "ADD_NEW_ENTRY";
const GET_ALL_ENTRIES = "GET_ALL_ENTRIES";
const GET_ENTRIES_BY_JOB_ID = "GET_ENTRIES_BY_JOB_ID";
const RESET_STATE = "RESET_STATE";
const GET_TOTAL = "GET_TOTAL";
const GET_HRS = "GET_HRS";
const ADD_ACTIVE_ENTRY = "ADD_ACTIVE_ENTRY";
const UPDATE_ACTIVE_ENTRY = "UPDATE_ACTIVE_ENTRY"

export function addActiveEntry(entry) {
  let newEntry = axios
    .post(`http://localhost:3005/api/entry/add`, entry)
    .then(result => {
      console.log(result.data);
      return result.data;
    })
    .catch(e => {
      console.log(`Error while trying to add entry: ${e}`);
    });
  return {
    type: ADD_ACTIVE_ENTRY,
    payload: newEntry
  };
}

export function updateActiveEntry(jobid, userid, entryid, updateEntry) {
  axios
    .put(
      `http://localhost:3005/api/entry/update/${jobid}/${userid}/${entryid}`,
      updateEntry
    )
    .then(result => {
      console.log(result.data);
    })
    .catch(e => {
      console.log(`Error in updating Entry: ${e}`);
    });

  return {
    type: UPDATE_ACTIVE_ENTRY,
    payload: {}
  };
}

export function updateClientID(client_id) {
  return {
    type: UPDATE_CLIENT_ID,
    payload: client_id
  };
}

export function updateJobID(job_id) {
  return {
    type: UPDATE_JOB_ID,
    payload: job_id
  };
}

export function updateJobName(job_name) {
  return {
    type: UPDATE_JOB_NAME,
    payload: job_name
  };
}

export function updateClientName(client_name) {
  return {
    type: UPDATE_CLIENT_NAME,
    payload: client_name
  };
}

export function updateEntryDate(entry_date) {
  return {
    type: UPDATE_ENTRY_DATE,
    payload: entry_date
  };
}

export function updateStartTime(start_time) {
  return {
    type: UPDATE_START_TIME,
    payload: start_time
  };
}

export function updateEndTime(end_time) {
  return {
    type: UPDATE_END_TIME,
    payload: end_time
  };
}

export function updateDuration(duration) {
  return {
    type: UPDATE_DURATION,
    payload: duration
  };
}

export function updateComment(comment) {
  return {
    type: UPDATE_COMMENT,
    payload: comment
  };
}

export function updateBilled(billed) {
  return {
    type: UPDATE_BILLED,
    payload: billed
  };
}

export function addNewEntry(job) {
  return {
    type: ADD_NEW_ENTRY,
    payload: entryServices.addEntry(job)
  };
}

export function getAllEntries(userid) {
  let enteries = [];

  axios
    .get(`http://localhost:3005/api/entry/${userid}`)
    .then(enteries => {
      enteries = enteries.data;
    })
    .catch(e => {
      console.log(e);
    });

  return {
    type: GET_ALL_ENTRIES,
    payload: enteries
  };
}

export function getEnteriesByJobId(userid, jobid) {
  let entries = axios
    .get(`http://localhost:3005/api/entry/${userid}/${jobid}`)
    .then(result => {
      return result.data;
    })
    .catch(e => {
      console.log(e);
    });

  return {
    type: GET_ENTRIES_BY_JOB_ID,
    payload: entries
  };
}

export function resetState() {
  return {
    type: RESET_STATE,
    payload: ENTRY_INTIAL_STATE
  };
}

export function getTotal(userid, jobid) {
  let total = axios
    .get(`http://localhost:3005/api/entry/total/${userid}/${jobid}`)
    .then(result => {
      return result.data[0].sum;
    })
    .catch(e => {
      console.log(e);
    });

  return {
    type: GET_TOTAL,
    payload: total
  };
}

export function getTotalHrs(userid, jobid) {
  let totalHrs = axios
    .get(`http://localhost:3005/api/entry/hrs/total/${userid}/${jobid}`)
    .then(result => {
      console.log(result.data);
      return result.data[0].sum;
    })
    .catch(e => {
      console.log(e);
    });

  return {
    type: GET_HRS,
    payload: totalHrs
  };
}

export default function entryReducer(state = ENTRY_INTIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_CLIENT_ID:
      return Object.assign({}, state, { client_id: action.payload });

    case UPDATE_JOB_ID:
      return Object.assign({}, state, { job_id: action.payload });

    case UPDATE_JOB_NAME:
      return Object.assign({}, state, { job_name: action.payload });

    case UPDATE_CLIENT_NAME:
      return Object.assign({}, state, { client_name: action.payload });

    case UPDATE_ENTRY_DATE:
      return Object.assign({}, state, { entry_date: action.payload });

    case UPDATE_START_TIME:
      return Object.assign({}, state, { start_time: action.payload });

    case UPDATE_END_TIME:
      return Object.assign({}, state, { end_time: action.payload });

    case UPDATE_DURATION:
      return Object.assign({}, state, { duration: action.payload });

    case UPDATE_COMMENT:
      return Object.assign({}, state, { billed: action.payload });

    case ADD_NEW_ENTRY:
      return Object.assign({}, state, { entry: action.payload });

    case GET_ALL_ENTRIES:
      return Object.assign({}, state, { entries: action.payload });

    case GET_ENTRIES_BY_JOB_ID + "_FULFILLED":
      return Object.assign({}, state, { entries: action.payload });

    case RESET_STATE:
      return Object.assign({}, action.payload);

    case GET_TOTAL + "_FULFILLED":
      return Object.assign({}, state, { total: action.payload });

    case GET_HRS + "_FULFILLED":
      return Object.assign({}, state, { totalHrs: action.payload });

    case ADD_ACTIVE_ENTRY + "_FULFILLED":
      return Object.assign({}, state, { activeEntry: action.payload });

      case UPDATE_ACTIVE_ENTRY + "_FULFILLED":
      return Object.assign({}, state, {activeEntry : action.payload})

    default:
      return state;
  }
}
