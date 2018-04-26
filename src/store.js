import {createStore, applyMiddleware, combineReducers} from 'redux';
import userReducer from './ducks/userReducer';
import jobreducer from './ducks/jobreducer';
import clientReducer from './ducks/clientReducer';
import promiseMiddleware from 'redux-promise-middleware';

const reducer = combineReducers({
    userReducer : userReducer,
    jobReducer : jobreducer,
    clientReducer : clientReducer
})

let middleware = promiseMiddleware();
console.log(reducer);

export default createStore(reducer, applyMiddleware(middleware));

