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

export function getAllClients() {
 let clientsData= axios
    .get("/api/clients").then((clients) => {
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


export default function reducer(state = INITIAL_STATE, action){
    switch (action.type) {   
        case GET_ALL_CLIENTS:
          return [ ...state.clients, action.payload];
    
        default:
          return state;
      }
}