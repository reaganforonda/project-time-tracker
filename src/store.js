import {createStore, applyMiddleware, combineReducers} from 'redux';
import userReducer from './ducks/userReducer';
import jobReducer from './ducks/jobreducer';
import clientReducer from './ducks/clientReducer';
import promiseMiddleware from 'redux-promise-middleware';

const reducer = combineReducers({
    userReducer : userReducer,
    jobReducer : jobReducer,
    clientReducer : clientReducer
})

let middleware = promiseMiddleware();
console.log(reducer);

export default createStore(reducer, applyMiddleware(middleware));

