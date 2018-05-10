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
import {getEntryForEdit} from '../../ducks/entryReducer';

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
  }

  handleDateChange(e, date) {
    this.setState({startDate : date})
  }

  handleTimeChange(e, date ) {
    this.setState({[e.target.name] : date})
  }

  render() {

    
    return (
      <div>
        <Paper zDepth={3} className="enteries-container">
          <p>{this.props.jobname}</p>
          <p>{this.props.clientName}</p>
          <p>{moment(this.props.date).format('MMMM Do, YYYY')}</p>
          <p>{this.props.startTime}</p>
          <p>{this.props.endTime}</p>
          <p>{numeral(this.props.duration).format('0,0.0')} Hrs</p>
          <RaisedButton onClick={() => this.handleModalOpen()} label="Edit">
            <Dialog modal={true} open={this.state.openModal}>
              <h1>{this.props.jobname}</h1>
              <h2>{this.props.clientName}</h2>
              <DatePicker
                autoOk={true}
                name="startDate"
                floatingLabelText="Entry Date"
              />
              <TimePicker
                hintText="Entry Start Time"
                name="startTime"
                floatingLabelText="Entry Start Time"
              />
              <TimePicker
                hintText="Entry End Time"
                name="endTime"
                floatingLabelText="Entry End Time"
                value={this.props.endTime}
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
                <RaisedButton label="Save" />
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

export default connect(mapStateToProps, {getEntryForEdit})(Entries);
