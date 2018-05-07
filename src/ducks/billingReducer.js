import axios from "axios";

const BILLING_INITIAL_STATE = {
  billing: [],
  selectedJob : {}
};

const GET_BILLING = "GET_BILLING";
const SELECT_FOR_BILLING = "SELECT_FOR_BILLING"

export function getBilling(user_id) {
  let billing = axios
    .get(`http://localhost:3005/api/jobs/billing/${user_id}`)
    .then(result => {
      return result.data;
    })
    .catch(e => {
      console.log(`Error at Reducer: ${e}`);
    });

  return {
    type: GET_BILLING,
    payload: billing
  };
}

export function selectedForBilling(job) {
    console.log(job)
    return {
        type : SELECT_FOR_BILLING,
        payload : job
    }
}

export default function reduce(state = BILLING_INITIAL_STATE, action) {
  switch (action.type) {
    case GET_BILLING + "_FULFILLED":
      return Object.assign({}, state, { billing: action.payload });

      case SELECT_FOR_BILLING:
        console.log(action.payload);
      return Object.assign({}, state, {selectedJob : action.payload})

    default:
      return state;
  }
}
