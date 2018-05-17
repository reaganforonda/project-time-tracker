import axios from "axios";

const INITIAL_STATE = {
  user: {},
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  picture: "",
  address_one: "",
  address_two: "",
  city: "",
  state: "",
  country: "",
  website: "",
  zip: "",
  loading : false
};

const GET_USER_INFO = "GET_USER_INFO";
const UPDATE_FIRST_NAME = "UPDATE_FIRST_NAME";
const UPDATE_LAST_NAME = "UPDATE_LAST_NAME";
const UPDATE_EMAIL = "UPDATE_EMAIL";
const UPDATE_PHONE = "UDPATE_PHONE";
const UPDATE_PICTURE = "UPDATE_PICTURE";
const UPDATE_ADDRESS_ONE = "UPDATE_ADDRESS_ONE";
const UPDATE_ADDRESS_TWO = "UPDATE_ADDRESS_TWO";
const UPDATE_CITY = "UPDATE_CITY";
const UPDATE_STATE = "UPDATE_STATE";
const UPDATE_WEBSITE = "UPDATE_WEBSITE";
const UPDATE_COUNTRY = "UPDATE_COUNTRY";
const UPDATE_ZIP = "UPDATE_ZIP";
const UPDATE_USER_INFO = "UPDATE_USER_INFO";

export function getUser() {
  let userData = axios.get("/auth/me").then(res => {
    return res.data;
  });

  return {
    type: GET_USER_INFO,
    payload: userData
  };
}

export function updateFirstName(first_name) {
  return {
    type: UPDATE_FIRST_NAME,
    payload: first_name
  };
}

export function updateLastName(last_name) {
  return {
    type: UPDATE_LAST_NAME,
    payload: last_name
  };
}

export function updateEmail(email) {
  return {
    type: UPDATE_EMAIL,
    payload: email
  };
}

export function updatePhone(phone) {
  return {
    type: UPDATE_PHONE,
    payload: phone
  };
}

export function updatePicture(picture) {
  return {
    type: UPDATE_PICTURE,
    payload: picture
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

export function updateCountry(country) {
  return {
    type: UPDATE_COUNTRY,
    payload: country
  };
}

export function updateWebsite(website) {
  return {
    type : UPDATE_WEBSITE,
    payload : website
  }
}

export function updateZip(zip) {
  return {
    type : UPDATE_ZIP,
    payload : zip
  }
}

export function updateUserInfo(user_id, user) {
  
  let updatedUser = axios
    .put(`/api/user/update/${user_id}`, user)
    .then(result => {
      return result.data;
    });

  return {
    type: UPDATE_USER_INFO,
    payload: updatedUser
  };
}

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {

    case GET_USER_INFO + "_PENDING":
    return Object.assign({}, state, {loading : true});

    case GET_USER_INFO + "_FULFILLED":
      return Object.assign({}, state, {loading: false, user: action.payload });

    case UPDATE_FIRST_NAME:
      return Object.assign({}, state, { first_name: action.payload });

      case UPDATE_LAST_NAME:
      return Object.assign({}, state, { last_name: action.payload });

      case UPDATE_EMAIL:
      return Object.assign({}, state, { email: action.payload });

      case UPDATE_PHONE:
      return Object.assign({}, state, { phone: action.payload });

      case UPDATE_PICTURE:
      return Object.assign({}, state, { picture: action.payload });

      case UPDATE_ADDRESS_ONE:
      return Object.assign({}, state, { address_one: action.payload });

      case UPDATE_ADDRESS_TWO:
      return Object.assign({}, state, { address_two: action.payload });

      case UPDATE_CITY:
      return Object.assign({}, state, { city: action.payload });

      case UPDATE_STATE:
      return Object.assign({}, state, { state: action.payload });

      case UPDATE_COUNTRY:
      return Object.assign({}, state, { country: action.payload });

      case UPDATE_WEBSITE:
      return Object.assign({}, state, { website: action.payload });
      
      case UPDATE_ZIP:
      return Object.assign({}, state, { zip: action.payload });

    case UPDATE_USER_INFO + "_FULFILLED":
      return Object.assign({}, state, { user: action.payload });

    default:
      return state;
  }
}
