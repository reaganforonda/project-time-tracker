import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";

export default function Job(props) {

let timeStamp = new Date();

  return (
    
    <div>
      <Paper zDepth={3} className="single-job-container">
        <p>{props.jobName}</p>
        <p>{props.clientName}</p>
        <div>
          {!props.clockedIn ? (
            <RaisedButton onClick={()=>props.clockIn(props.job)} className='job-button'label="Clock In" primary={true} />
          ) : (
            <RaisedButton onClick={()=>props.clockOut(props.job)} className='job-button'label="Clock Out" secondary={true} />
          )}
          <RaisedButton className='job-button' label="View Enteries" />
        </div>
      </Paper>
    </div>
  );
}

