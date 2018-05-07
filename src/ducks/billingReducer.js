import axios from "axios";

const BILLING_INITIAL_STATE = {
  billing: []
};

const GET_BILLING = "GET_BILLING";

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

export default function reduce(state = BILLING_INITIAL_STATE, action) {
  switch (action.type) {
    case GET_BILLING + "_FULFILLED":
      return Object.assign({}, state, { billing: action.payload });

    default:
      return state;
  }
}
