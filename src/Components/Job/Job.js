import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";

export default function Job(props) {
  return (
    <div>
      <Paper zDepth={3} className="single-job-container">
        <p>{props.name}</p>
        <p>{props.client}</p>
        <div>
          {!props.clockedIn ? (
            <RaisedButton className='job-button'label="Clock In" primary={true} />
          ) : (
            <RaisedButton className='job-button'label="Clock Out" secondary={true} />
          )}
          <RaisedButton className='job-button' label="View Enteries" />
        </div>
      </Paper>
    </div>
  );
}
