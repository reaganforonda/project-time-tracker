import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
import { Dialog } from "material-ui";

import {connect} from 'react-redux';
import {openModal, closeModal} from '../../ducks/jobReducer'

export function Job(props) {

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
          <RaisedButton  onClick={()=>props.openModal()} className='job-button' label="View Enteries">
              <Dialog modal={true} open={props.open}>


              <RaisedButton onClick={()=>props.closeModal()} label='Close'/>
                
              </Dialog>
          </RaisedButton>
        </div>
      </Paper>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    open : state.jobReducer.open
  }
}

export default connect (mapStateToProps, {openModal, closeModal})(Job);