import axios from "axios";

const BILLING_INITIAL_STATE = {
  billing: [],
  selectedJob: {},
  lastInvoiceId: '',
  invoiceNum: "",
  invoiceDate: "",
  dueDate: "",
  entries: [],
  jobEndDate: "",
  invoiceLocation : ''
};

const GET_BILLING = "GET_BILLING";
const SELECT_FOR_BILLING = "SELECT_FOR_BILLING";
const GET_LAST_INVOICE_ID = "GET_LAST_INVOICE_ID";
const UPDATE_INVOICE_NUM = "UPDATE_INVOICE_NUM";
const UPDATE_INVOICE_DATE = "UPDATE_INVOICE_DATE";
const UPDATE_DUE_DATE = "UPDATE_DUE_DATE";
const GET_ENTRIES = "GET_ENTRIES";
const UPDATE_JOB_END_DATE = "UPDATE_JOB_END_DATE";
const UPDATE_INVOICE_LOCATION = "UPDATE_INVOICE_LOCATION"

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
  return {
    type: SELECT_FOR_BILLING,
    payload: job
  };
}

export function getLastBillingNumber(userid) {
  let invoiceID = axios
    .get(`http://localhost:3005/api/billing/invoiceid/${userid}`)
    .then(result => {
      return result.data[0].max;
    })
    .catch(e => {
      console.log(`Error at Billing Reducer: ${e}`);
    });

  return {
    type: GET_LAST_INVOICE_ID,
    payload: invoiceID
  };
}

export function updateInvoiceNum(invoiceNum) {
  return {
    type: UPDATE_INVOICE_NUM,
    payload: invoiceNum
  };
}

export function updateInvoiceDate(invoiceDate) {
  return {
    type: UPDATE_INVOICE_DATE,
    payload: invoiceDate
  };
}

export function updateDueDate(dueDate) {
  return {
    type: UPDATE_DUE_DATE,
    payload: dueDate
  };
}

export function getEnteriesForJob(user_id, job_id) {
  let entries = axios
    .get(`http://localhost:3005/api/entry/${user_id}/${job_id}`)
    .then(result => {
      return result.data;
    })
    .catch(e => {
      console.log(`Error at Reducer: ${e}`);
    });

  return {
    type: GET_ENTRIES,
    payload: entries
  };
}

export function updateJobEndDate(jobEndDate) {
  return {
    type: UPDATE_JOB_END_DATE,
    payload: jobEndDate
  };
}

export function updateInvLocation(user_id, invoice_id, file) {
  let location = axios.get(`http://localhost:3005/api/billing/update/invoice/${user_id}/${invoice_id}`, file).then((result) => {
    return result.data
  }).catch((e) => {
    console.log(`Error GET request at reducer: ${e}`)
  })

  return {
    type: UPDATE_INVOICE_LOCATION,
    payload : location
  }
}


export default function reduce(state = BILLING_INITIAL_STATE, action) {
  switch (action.type) {
    case GET_BILLING + "_FULFILLED":
      return Object.assign({}, state, { billing: action.payload });

    case SELECT_FOR_BILLING:
      console.log(action.payload);
      return Object.assign({}, state, { selectedJob: action.payload });

    case GET_LAST_INVOICE_ID + "_FULFILLED":
      return Object.assign({}, state, { lastInvoiceId: action.payload });

    case UPDATE_INVOICE_NUM:
      return Object.assign({}, state, { invoiceNum: action.payload });

    case UPDATE_DUE_DATE:
      return Object.assign({}, state, { dueDate: action.payload });

    case UPDATE_INVOICE_DATE:
      return Object.assign({}, state, { invoiceDate: action.payload });

    case GET_ENTRIES + "_FULFILLED":
      return Object.assign({}, state, { entries: action.payload });

    case UPDATE_JOB_END_DATE:
      return Object.assign({}, state, { jobEndDate: action.payload });

      case UPDATE_INVOICE_LOCATION + "_FULFILLED":
      return Object.assign({}, state, {invoiceLocation : action.payload})

    default:
      return state;
  }
}
