import React from "react";
import {
  Paper,
  Dialog,
  TimePicker,
  TextField,
  RaisedButton,
  DatePicker
} from "material-ui";

import moment from 'moment';
import numeral from 'numeral';
import {connect} from 'react-redux';
import {getEntryForEdit, getAllEntries, updateActiveEntry} from '../../ducks/entryReducer';

export class Entries extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      startDate: "",
      startTime: "",
      endTime: "",
      duration: 0,
      comment: '',
      job: "",
      edit: false
    };

    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.calculateDuration = this.calculateDuration.bind(this);
    this.updateEntry = this.updateEntry.bind(this)
  }

  handleInputChange(e) {
    this.setState({[e.target.name] : e.target.value})
  }

  handleModalOpen() {
    this.setState({ openModal: true });
    this.props.getEntryForEdit(this.props.user.user_id, this.props.entry.job_id, this.props.entry.entry_id)
    console.log(this.props.entryForEdit)
  }

  handleModalClose() {
    this.setState({ openModal: false });
    this.props.getAllEntries(this.props.user.user_id);
    console.log(this.props.entries)
  }

  handleDateChange(e, date) {
    this.setState({startDate : date})
  }

  handleStartTimeChange(e, date ) {
    this.setState({startTime : date})
    console.log(date);
  }

  handleEndTimeChange(e, date ) {
    this.setState({endTime: date})
  }

  formatTime(date) {
    let formatedTime = `${date.getHours()}:${date.getMinutes()}`;
    console.log(formatedTime);
    return formatedTime;
  }

  // Calculate duration by converting start time and end time into minutes
  // use ~ ~ to turn text into number by flipping the bits
  calculateDuration() {
    let startInMinutes =
      ~~this.state.startTime.getHours() * 60 +
      ~~this.state.startTime.getMinutes();
    let endInMinutes =
      ~~this.state.endTime.getHours() * 60 + ~~this.state.endTime.getMinutes();
    let duration = 0;

    try {
      if (startInMinutes > endInMinutes)
        throw "Start Time Can't Be After End Time";
      duration = (endInMinutes - startInMinutes) / 60;
    } catch (err) {
      alert(`Error : ${err}`);
    }

    return duration;
  }

  updateEntry(){

    let duration = this.calculateDuration();
    
    console.log(this.props.entry.rate)
    let total = duration * this.props.entry.rate
    let start_time = moment(this.state.startTime).format('h:mm:ss a')
    console.log(start_time)
    let end_time = moment(this.state.endTime).format('h:mm:ss a')
    console.log(end_time)
    let entry_date = moment(this.state.startDate).format('MM/DD/YYYY')
    console.log(entry_date)

    let updatedEntry = {
      entry_date : entry_date,
      start_time : start_time,
      end_time : end_time,
      duration : duration,
      total : total,
      comment : this.state.comment,
    }
    console.log(updatedEntry)
    this.props.updateActiveEntry(this.props.entry.job_id, this.props.user.user_id, this.props.entry.entry_id, updatedEntry);
    this.props.getAllEntries(this.props.user.user_id);
    this.handleModalClose();
  }

  render() {
    const style= {
      backgroundColor : "#1695A3"
    }
    
    return (
      <div>
        <Paper style={style}zDepth={1} className="enteries-container">
          <p>{this.props.jobname}</p>
          <p>{this.props.clientName}</p>
          <p>{moment(this.props.entry.entry_date).format('MM/DD/YYYY')}</p>
          <p>{this.props.startTime}</p>
          <p>{this.props.endTime}</p>
          <p>{numeral(this.props.duration).format('0,0.0')} Hrs</p>
          <RaisedButton onClick={() => this.handleModalOpen()} label="Edit">
            <Dialog modal={true} open={this.state.openModal}>
              <h1>{this.props.jobname}</h1>
              <h2>{this.props.clientName}</h2>
              <DatePicker
                autoOk={false}
                name="startDate"
                floatingLabelText="Entry Date"
                onChange={(e, date) => this.handleDateChange(e, date)}
              />
              <TimePicker
                hintText="Entry Start Time"
                name="startTime"
                floatingLabelText="Entry Start Time"
                onChange={(e, date)=>this.handleStartTimeChange(e, date)}
              />
              <TimePicker
                hintText="Entry End Time"
                name="endTime"
                floatingLabelText="Entry End Time"
                onChange={(e, date)=>this.handleEndTimeChange(e, date)}
              />
              <TextField
                onChange={(e)=>this.handleInputChange(e)}
                type="text"
                name="comment"
                hintText="Comment"
                floatingLabelText="Comment"
                
              />
              <div>
                <RaisedButton
                  onClick={() => this.handleModalClose()}
                  label="Cancel"
                />
                <RaisedButton onClick={()=>this.updateEntry()} label="Save" />
              </div>
            </Dialog>
          </RaisedButton>
          <RaisedButton
            onClick={() => this.props.delete(this.props.entry)}
            label="Delete"
          />
        </Paper>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    entries : state.entryReducer.entries,
    entryForEdit : state.entryReducer.entryForEdit
  };
}

export default connect(mapStateToProps, {updateActiveEntry, getAllEntries, getEntryForEdit})(Entries);
