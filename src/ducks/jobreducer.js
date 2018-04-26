import axios from 'axios';

const JOB_INITIAL_STATE = {
    job_id : 0,
    client_id : 0,
    user_id : 0,
    job_name : '',
    start_date : '',
    end_date : '',
    completed : false,
    rate : 0,
    description : ''
}

export default function jobreducer(state = JOB_INITIAL_STATE, action){
    switch(action.type) {
        default :
        return state;
    }
}