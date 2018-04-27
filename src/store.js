import {createStore, applyMiddleware, combineReducers} from 'redux';
import userReducer from './ducks/userReducer';
import jobReducer from './ducks/jobReducer';
import clientReducer from './ducks/clientReducer';
import promiseMiddleware from 'redux-promise-middleware';

// TODO: Add remaining reducers
const reducer = combineReducers({
    userReducer : userReducer,
    jobReducer : jobReducer,
    clientReducer : clientReducer
})

let middleware = promiseMiddleware();

export default createStore(reducer, applyMiddleware(middleware));

