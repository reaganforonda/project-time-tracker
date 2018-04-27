import axios from "axios";

const INITIAL_STATE = {
  user: {},

};

const GET_USER_INFO = "GET_USER_INFO";
const GET_ALL_CLIENTS = "GET_ALL_CLIENTS";


export function getUser() {
  let userData = axios.get("/auth/me").then(res => {
    return res.data;
  });

  return {
    type: GET_USER_INFO,
    payload: userData
  };
}

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER_INFO + "_FULFILLED":
      return Object.assign({}, state, { user: action.payload });

    // case GET_ALL_CLIENTS:
    //   return [ ...state.clients, action.payload];

    default:
      return state;
  }
}
