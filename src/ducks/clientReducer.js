import axios from "axios";

const INITIAL_STATE = {
  clients: [],
  client_id: 0,
  user_id: 0,
  client_name: "",
  address_one: "",
  address_two: "",
  city: "",
  state: "",
  country: "",
  phone: "",
  website: "",
  zip: ""
};

const GET_ALL_CLIENTS = "GET_ALL_CLIENTS";
const UPDATE_CLIENT_NAME = "UPDATE_CLIENT_NAME";
const UPDATE_ADDRESS_ONE = "UPDATE_ADDRESS_ONE";
const UPDATE_ADDRESS_TWO = "UPDATE_ADDRESS_TWO";
const UPDATE_CITY = "UPDATE_CITY";
const UPDATE_STATE = "UPDATE_STATE";
const UPDATE_ZIP = "UPDATE_ZIP";
const UPDATE_WEBSITE = "UPDATE_WEBSITE";
const UPDATE_PHONE = "UPDATE_PHONE";

export function getAllClients(userid) {
  let clientsData = axios
    .get(`/api/clients/${userid}`)
    .then(clients => {
      return clients.data;
    })
    .catch(e => {
      console.log(e);
    });

  return {
    type: GET_ALL_CLIENTS,
    payload: clientsData
  };
}

export function updateClientName(client_name) {
  return {
    type: UPDATE_CLIENT_NAME,
    payload: client_name
  };
}

export function updateAddressOne(address_one) {
  return {
    type: UPDATE_ADDRESS_ONE,
    payload: address_one
  };
}

export function updateAddressTwo(address_two) {
  return {
    type: UPDATE_ADDRESS_TWO,
    payload: address_two
  };
}

export function updateCity(city) {
  return {
    type: UPDATE_CITY,
    payload: city
  };
}

export function updateState(state) {
  return {
    type: UPDATE_STATE,
    payload: state
  };
}

export function updateZip(zip) {
  return {
    type: UPDATE_ZIP,
    payload: zip
  };
}

export function updateWebsite(website) {
  return {
    type: UPDATE_WEBSITE,
    payload: website
  };
}

export function updatePhone(phone) {
  return {
    type: UPDATE_PHONE,
    payload: phone
  };
}


export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_CLIENTS + "_FULFILLED":
      return Object.assign({}, state, {clients : action.payload});

      case UPDATE_CLIENT_NAME:
      return Object.assign({}, state, {client_name : action.payload});

      case UPDATE_ADDRESS_ONE:
      return Object.assign({}, state, {address_one : action.payload});

      case UPDATE_ADDRESS_TWO:
      return Object.assign({}, state, {address_two : action.payload});

      case UPDATE_CITY:
      return Object.assign({}, state, {city : action.payload});

      case UPDATE_STATE:
      return Object.assign({}, state, {state : action.payload});

      case UPDATE_ZIP:
      return Object.assign({}, state, {zip: action.payload});

      case UPDATE_WEBSITE:
      return Object.assign({}, state, {website : action.payload});

      case UPDATE_PHONE:
      return Object.assign({}, state, {phone : action.payload});
      
    default:
      return state;
  }
}
