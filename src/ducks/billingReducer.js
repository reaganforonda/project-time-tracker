import axios from "axios";

const BILLING_INITIAL_STATE = {
  billing: [],
  selectedJob : {},
  lastInvoiceId : ''
};

const GET_BILLING = "GET_BILLING";
const SELECT_FOR_BILLING = "SELECT_FOR_BILLING";
const GET_LAST_INVOICE_ID = "GET_LAST_INVOICE_ID";

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

export function getLastBillingNumber(userid) {
    axios.get(`http://localhost:3005/api/billing/invoiceid/${userid}`).then((result)=> {
        console.log(result.data)
    }).catch((e) => {
        console.log(`Error at Billing Reducer: ${e}`)
    })
}

export default function reduce(state = BILLING_INITIAL_STATE, action) {
  switch (action.type) {
    case GET_BILLING + "_FULFILLED":
      return Object.assign({}, state, { billing: action.payload });

      case SELECT_FOR_BILLING:
        console.log(action.payload);
      return Object.assign({}, state, {selectedJob : action.payload})

      case GET_LAST_INVOICE_ID:
      return Object.assign({}, state, {lastInvoiceId : action.payload})

    default:
      return state;
  }
}
