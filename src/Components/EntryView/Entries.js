import React from "react";
import {
  Paper,
  Dialog,
  SelectField,
  TimePicker,
  TextField,
  RaisedButton,
  DatePicker
} from "material-ui";

export default class Entries extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      startDate: "",
      startTime: "",
      endTime: "",
      duration: 0,
      comment: "",
      job: "",
      edit: false
    };

    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalOpen() {
    this.setState({ openModal: true });
  }

  handleModalClose() {
    this.setState({ openModal: false });
  }

  render() {
    return (
      <div>
        <Paper zDepth={3} className="enteries-container">
          <p>Job Name: {this.props.jobname}</p>
          <p>Client: {this.props.clientName}</p>
          <p>Date: {this.props.date}</p>
          <p>Start Time: {this.props.startTime}</p>
          <p>End Time: {this.props.endTime}</p>
          <p>Duration: {this.props.duration}</p>
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
