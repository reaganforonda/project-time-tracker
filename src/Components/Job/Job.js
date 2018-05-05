import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import { Dialog, Paper } from "material-ui";

import { connect } from "react-redux";
import { openModal, closeModal } from "../../ducks/jobReducer";
import { getTotalHrs, resetState, getTotal, getEnteriesByJobId } from "../../ducks/entryReducer";

export class Job extends React.Component {
  constructor(props) {
    super(props);
    this.handleViewEnteries = this.handleViewEnteries.bind(this);
    this.handleCloseEnteries = this.handleCloseEnteries.bind(this);
  }

  handleViewEnteries() {

    this.props.openModal();
    this.props.getEnteriesByJobId(
      this.props.user.user_id,
      this.props.job.job_id
    );
    this.props.getTotal(this.props.user.user_id, this.props.job.job_id);
    this.props.getTotalHrs(this.props.user.user_id, this.props.job.job_id)
    
  }

  handleCloseEnteries(){
    this.props.closeModal();
    this.props.resetState();
  }

  render() {

    let arr = this.props.entries.map(entry => {
      return (
        <div key={entry.entry_id}>
          <Paper zDepth={1}>
            <p>{entry.entry_date}</p>
            <p>{entry.start_time}</p>
            <p>{entry.end_time}</p>
            <p>{entry.duration} hrs</p>
            <p>${entry.total}</p>

          </Paper>
        </div>
      )
    })

    return (
      <div>
        <Paper zDepth={3} className="single-job-container">
          <p>{this.props.jobName}</p>
          <p>{this.props.clientName}</p>
          <div>
            {!this.props.clockedIn ? (
              <RaisedButton
                onClick={() => this.props.clockIn(this.props.job)}
                className="job-button"
                label="Clock In"
                primary={true}
              />
            ) : (
              <RaisedButton
                onClick={() => this.props.clockOut(this.props.job)}
                className="job-button"
                label="Clock Out"
                secondary={true}
              />
            )}
            <RaisedButton
              onClick={() => this.handleViewEnteries()}
              className="job-button"
              label="View Enteries"
            >
              <Dialog modal={true} open={this.props.open}>
              <div>
                <h2>Total Hrs: {this.props.totalHrs}</h2>
                <h2>Total Billing: ${this.props.total}</h2>
                {arr}
              </div>
              <div>
                
              </div>
                <RaisedButton
                  onClick={() => this.handleCloseEnteries()}
                  label="Close"
                />
              </Dialog>
            </RaisedButton>
          </div>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    open: state.jobReducer.open,
    entries: state.entryReducer.entries,
    total : state.entryReducer.total,
    totalHrs : state.entryReducer.totalHrs
  };
}

export default connect(mapStateToProps, {
  getEnteriesByJobId,
  openModal,
  closeModal,
  resetState,
  getTotal,
  getTotalHrs
})(Job);
