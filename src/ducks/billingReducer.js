import axios from "axios";

const BILLING_INITIAL_STATE = {
  billing: [],
  selectedJob: {},
  lastInvoiceId: 0,
  invoiceNum: "",
  invoiceDate: "",
  dueDate: "",
  entries: []
};

const GET_BILLING = "GET_BILLING";
const SELECT_FOR_BILLING = "SELECT_FOR_BILLING";
const GET_LAST_INVOICE_ID = "GET_LAST_INVOICE_ID";
const UPDATE_INVOICE_NUM = "UPDATE_INVOICE_NUM";
const UPDATE_INVOICE_DATE = "UPDATE_INVOICE_DATE";
const UPDATE_DUE_DATE = "UPDATE_DUE_DATE";
const GET_ENTRIES = "GET_ENTRIES";

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
  console.log(job);
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

  if (invoiceID === null) {
    invoiceID = 0;
  }

  console.log(invoiceID);
  return {
    type: GET_LAST_INVOICE_ID,
    payload: invoiceID
  };
}

export function updateInvoiceNum(invoiceNum) {
  console.log(invoiceNum);
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
        console.log(result.data)
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

    default:
      return state;
  }
}
