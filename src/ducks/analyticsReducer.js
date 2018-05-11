import axios from "axios";

const ANALYTICS_INITIAL_STATE = {
  inProgressCount: 0,
  inProgressTotals: {},
  totalsClient: [],
  hrsMonthly: [],
  revMonthly: []
};

const GET_IN_PROGRESS_COUNT = "GET_IN_PROGRESS_COUNT";
const GET_IN_PROGRESS_TOTALS = "GET_IN_PROGRESS_TOTALS";
const GET_TOTALS_CLIENT = "GET_TOTALS_CLIENT";
const GET_HRS_MONTHLY = "GET_HRS_MONTHLY";
const GET_REV_MONTHLY = "GET_REV_MONTHLY";

export function getHrsMonthly(userid) {
    let hrsMonthly = axios.get(`/api/data/jobs/hrsmonthly/${userid}`).then((result) => {
        return result.data
    }).catch((e) => {
        console.log(`Error at reducer while trying to access server: ${e}`);
    })

    return {
        type: "GET_HRS_MONTHLY",
        payload : hrsMonthly
    }
}

export function getRevMonthly(userid) {
    let revMonthly = axios.get(`/api/data/jobs/revmonthly/${userid}`).then((result) => {
        return result.data
    }).catch((e) => {
        console.log(`Error at reducer while trying to access server: ${e}`);
    })

    return {
        type: "GET_REV_MONTHLY",
        payload : revMonthly
    }
}

export function getTotalsClient(userid) {
  let totals = axios.get(`/api/data/jobs/clientotal/${userid}`).then(result => {
    return result.data;
  });

  return {
    type: GET_TOTALS_CLIENT,
    payload: totals
  };
}

export function getInProgressCount(userid) {
  let count = axios
    .get(`/api/data/jobs/progresscount/${userid}`)
    .then(result => {
      return result.data[0].count;
    })
    .catch(e => {
      console.log(`Error at reducer while trying to access server: ${e}`);
    });

  console.log(count);

  return {
    type: GET_IN_PROGRESS_COUNT,
    payload: count
  };
}

export function getInProgressTotals(userid) {
  let totals = axios
    .get(`/api/data/jobs/progress/total/${userid}`)
    .then(result => {
      return result.data[0];
    })
    .catch(e => {
      console.log(`Error at reducer while trying to access server: ${e}`);
    });

  return {
    type: GET_IN_PROGRESS_TOTALS,
    payload: totals
  };
}

export default function jobReducer(state = ANALYTICS_INITIAL_STATE, action) {
  switch (action.type) {
    case GET_REV_MONTHLY + "_FULFILLED":
      return Object.assign({}, state, { revMonthly: action.payload });

    case GET_HRS_MONTHLY + "_FULFILLED":
      return Object.assign({}, state, { hrsMonthly: action.payload });

    case GET_TOTALS_CLIENT + "_FULFILLED":
      return Object.assign({}, state, { totalsClient: action.payload });

    case GET_IN_PROGRESS_COUNT + "_FULFILLED":
      return Object.assign({}, state, { inProgressCount: action.payload });

    case GET_IN_PROGRESS_TOTALS + "_FULFILLED":
      return Object.assign({}, state, { inProgressTotals: action.payload });

    default:
      return state;
  }
}
