import {createStore, applyMiddleware, combineReducers} from 'redux';
import userReducer from './ducks/userReducer';
import jobReducer from './ducks/jobReducer';
import clientReducer from './ducks/clientReducer';
import promiseMiddleware from 'redux-promise-middleware';
import entryReducer from './ducks/entryReducer';
import billingReducer from './ducks/billingReducer';

// TODO: Add remaining reducers
const reducer = combineReducers({
    userReducer : userReducer,
    jobReducer : jobReducer,
    clientReducer : clientReducer,
    entryReducer : entryReducer,
    billingReducer : billingReducer
})

let middleware = promiseMiddleware();

export default createStore(reducer, applyMiddleware(middleware));

