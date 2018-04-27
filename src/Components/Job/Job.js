import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";

import {connect} from 'react-redux';

import {updateClockIn, clockIn, clockOut} from '../../ducks/jobReducer'

export function Job(props) {

let timeStamp = new Date();
console.log(props.clockedIn)
  return (
    
    <div>
      <Paper zDepth={3} className="single-job-container">
        <p>{props.jobName}</p>
        <p>{props.clientName}</p>
        <div>
          {!props.clockedIn ? (
            <RaisedButton  onClick={()=>props.clockIn()} className='job-button'label="Clock In" primary={true} />
          ) : (
            <RaisedButton className='job-button'label="Clock Out" secondary={true} />
          )}
          <RaisedButton className='job-button' label="View Enteries" />
        </div>
      </Paper>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    clockedIn : state.jobReducer.clockedIn
  }
}

export default connect(mapStateToProps, {clockIn, clockOut, updateClockIn})(Job);
