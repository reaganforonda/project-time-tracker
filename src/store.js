import {createStore, applyMiddleware, combineReducers} from 'redux';
import userReducer from './ducks/userReducer';
import jobReducer from './ducks/jobReducer';
import clientReducer from './ducks/clientReducer';
import promiseMiddleware from 'redux-promise-middleware';
import entryReducer from './ducks/entryReducer';
import billingReducer from './ducks/billingReducer';
import analyticsReducer from './ducks/analyticsReducer'


const reducer = combineReducers({
    userReducer : userReducer,
    jobReducer : jobReducer,
    clientReducer : clientReducer,
    entryReducer : entryReducer,
    billingReducer : billingReducer,
    analyticsReducer : analyticsReducer
})

let middleware = promiseMiddleware();

export default createStore(reducer, applyMiddleware(middleware));

