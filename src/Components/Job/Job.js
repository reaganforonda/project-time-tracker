import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import { Dialog, Paper } from "material-ui";
import numeral from "numeral";
import moment from 'moment'
import { connect } from "react-redux";
import { openModal, closeModal } from "../../ducks/jobReducer";
import {
  getTotalHrs,
  resetState,
  getTotal,
  getEnteriesByJobId
} from "../../ducks/entryReducer";

export class Job extends React.Component {
  constructor(props) {
    super(props);
    this.handleViewEnteries = this.handleViewEnteries.bind(this);
    this.handleCloseEnteries = this.handleCloseEnteries.bind(this);
    this.convertToTime = this.convertToTime.bind(this);
  }

  handleViewEnteries() {
    this.props.openModal();
    this.props.getEnteriesByJobId(
      this.props.user.user_id,
      this.props.job.job_id
    );
    this.props.getTotal(this.props.user.user_id, this.props.job.job_id);
    this.props.getTotalHrs(this.props.user.user_id, this.props.job.job_id);
    
  }

  handleCloseEnteries() {
    this.props.closeModal();
    this.props.resetState();
  }

  convertToTime(strg) {
    let newTimeStrg = '';

    if(strg === null) {
      return ''
    }
    let arr = strg.split(':')
    let timePeriod = ''
    let hr = ''
    let minute = ''
    if(Number(arr[0]) > 12 ) {
        timePeriod = 'PM'
        hr = String(Number(arr[0]) - 12)
    } else {
        hr =arr[0]
        timePeriod = 'AM'
    }
    
    return  `${hr}:${arr[1]}:${arr[2]} ${timePeriod}`
}


  render() {

    const overlayStyle = {
      backgroundColor: "rgba(0,0,0, .89)"
    }

    const styleEntryPaper = {
      style : {
        backgroundColor : '#6B6E70'
    }}

    const stylePaper = {
      stylePaper : {
        backgroundColor : '#6B6E70',
        color: 'white'
    }}

    const buttonStyle1 = {
      labelColor : "white",
      backgroundColor: "#86C232"
    };

    let arr = this.props.entries.map(entry => {
      return (
        <Paper
          style={{ background: "transparent" }}
          key={entry.entry_id}
          zDepth={1}
        >
          <div className="job-entry-modal-entries">
            <p>{moment(new Date(entry.entry_date)).format('MM/DD/YYYY')}</p>
            <p>{this.convertToTime(entry.start_time)}</p>
            <p>{this.convertToTime(entry.end_time)}</p>
            <p>{numeral(entry.duration).format("0,0.0")} hrs</p>
            <p>{numeral(entry.total).format("$0,0.00")}</p>
          </div>
        </Paper>
      );
    });
    return (
      <div>
        <Paper zDepth={1} style={stylePaper.stylePaper} className="single-job-container">
          <p style={{width: '20%'}}>{this.props.clientName}</p>
          <p style={{width: '15%'}}>{this.props.jobName}</p>
          <p style={{width: '15%'}}>{this.props.job.description}</p>
          <p style={{width: '15%'}}>{moment(new Date(this.props.job.start_date)).format('MM/DD/YYYY')}</p>
          <p style={{width: '5%',textAlign:'right'}}>Rate {numeral(this.props.job.rate).format('$0,0.00')}</p>
          <div>
            {!this.props.clockedIn ? (
              <RaisedButton
                backgroundColor={"#86C232"}
                labelColor={"#000000"}
                onClick={() => this.props.clockIn(this.props.job)}
                className="job-button"
                label="CLOCK IN"
              />
            ) : (
              <RaisedButton
                onClick={() => this.props.clockOut(this.props.job)}
                className="job-button"
                backgroundColor={"#222629"}
                labelColor={"#86C232"}
                label="CLOCK OUT"
                
              />
            )}
            <RaisedButton
              onClick={() => this.handleViewEnteries()}
              backgroundColor={"#000000"}
                labelColor={"white"}
              className="job-button"
              label="ENTRIES"
            >
              <Dialog
                overlayStyle={overlayStyle}
                contentStyle={{ width: "fit-content" }}
                paperProps = {styleEntryPaper}
                modal={true}
                open={this.props.open}
              >
                <div className="job-enteries">
                  <div className="job-enteries-header">
                    <h2>
                      Total Hrs: {numeral(this.props.totalHrs).format("0,0.00")}
                    </h2>
                    <h2>
                      Total Billing:{" "}
                      {numeral(this.props.total).format("$0,0.00")}
                    </h2>
                  </div>
                  {arr}
                </div>
                <RaisedButton
                backgroundColor={buttonStyle1.backgroundColor}
                labelColor={buttonStyle1.labelColor}
                  onClick={() => this.handleCloseEnteries()}
                  label="CLOSE"
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
    total: state.entryReducer.total,
    totalHrs: state.entryReducer.totalHrs
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
