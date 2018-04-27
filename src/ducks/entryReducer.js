import axios from "axios";
import * as entryServices from '../services/entryservices';

const ENTRY_INTIAL_STATE = {
    client_id : 0,
    job_id : 0,
    job_name : '',
    client_name : '',
    entry_date : '',
    start_time : '',
    end_time : '',
    duration : '',
    comment : '',
    billed : false

}

const UPDATE_CLIENT_ID = "UPDATE_CLIENT_ID";
const UPDATE_JOB_ID = "UPDATE_JOB_ID";
const UPDATE_JOB_NAME = "UPDATE_JOB_NAME";
const UPDATE_CLIENT_NAME = "UPDATE_CLIENT_NAME";
const UPDATE_ENTRY_DATE = "UPDATE_ENTRY_DATE";
const UPDATE_START_TIME = "UPDATE_START_TIME";
const UPDATE_END_TIME = "UPDATE_END_TIME";
const UPDATE_DURATION = "UPDATE_DURATION";
const UPDATE_COMMENT = "UPDATE_COMMENT";
const UPDATE_BILLED = "UPDATE_BILLED";
const ADD_NEW_ENTRY = "ADD_NEW_ENTRY";

export function updateClientID(client_id) {
    return {
        type : UPDATE_CLIENT_ID,
        payload : client_id
    }
};

export function updateJobID(job_id) {
    return {
        type : UPDATE_JOB_ID,
        payload : job_id
    }
};

export function updateJobName(job_name) {
    return {
        type : UPDATE_JOB_NAME,
        payload : job_name
    }
};

export function updateClientName(client_name){
    return {
        type : UPDATE_CLIENT_NAME,
        payload : client_name
    }
};

export function updateEntryDate(entry_date) {
    return {
        type : UPDATE_ENTRY_DATE,
        payload : entry_date
    }
}

export function updateStartTime(start_time) {
    return {
        type : UPDATE_START_TIME,
        payload : start_time
    }
};

export function updateEndTime(end_time) {
    return {
        type : UPDATE_END_TIME,
        payload : end_time
    }
}

export function duration (duration){
    return {
        type : UPDATE_DURATION,
        payload : duration
    }
}