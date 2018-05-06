import axios from "axios";

const BILLING_INITIAL_STATE = {
    clients : [],
    jobs : [],
    entries : []
};

const GET_ALL_CLIENTS = "GET_ALL_CLIENTS";
const GET_ALL_JOBS = "GET_ALL_JOBS";
const GET_ALL_ENTRIES = "GET_ALL_ENTRIES";

export function getAllClients(user_id) {
    let clients = axios.get(`/api/clients/${user_id}`).then((clients) => {
        console.log(clients.data);
        return clients.data
    });

    return {
        type : GET_ALL_CLIENTS,
        payload : clients
    }
}

export default function reduce(state = BILLING_INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_CLIENTS + "_FULFILLED":
    return Object.assign({}, state, {clients : action.payload})

    default:
      return state;
  }
}
