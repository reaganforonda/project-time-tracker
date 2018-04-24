import React from "react";
import Menu from "../Menu/Menu";
import Jobs from "../Jobs/Jobs";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import DatePicker from "material-ui/DatePicker";
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom';

export default class JobView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };

    this.handleAddJobClick = this.handleAddJobClick.bind(this);
    this.handleCancelModalClick = this.handleCancelModalClick.bind(this);
  }

  handleAddJobClick() {
    this.setState({ modalOpen: true });
  }

  handleCancelModalClick(){
    this.setState({modalOpen: false})
  }

  render() {
    return (
      <div>
        <div className="menu">
          <Menu />
        </div>

        <div className="job-container">
          <div className="clock-in-container">
            <div className="clockedIn">
              <h1>On The Clock</h1>
            </div>
            <div />
          </div>

          <div className="clock-out-container">
            <div className="clockedOut">
              <h1>Off The Clock</h1>
            </div>
          </div>
        </div>

        <div className="floating-action">
          <FloatingActionButton
            onClick={() => this.handleAddJobClick()}
            mini={false}
            disabled={false}
          >
            <ContentAdd />
            <Dialog modal={true} open={this.state.modalOpen}>
              <form className="job-entry-form">
                <TextField hintText="Job Name" floatingLabelText="Job Name" />
                <TextField
                  hintText="Job Description"
                  floatingLabelText="Job Description"
                />
                <DatePicker
                  hintText="Job Start Date"
                  floatingLabelText="Job Start Date"
                />
                <TextField
                  hintText="Hourly Rate"
                  floatingLabelText="Hourly Rate"
                />
                <div>
                  <RaisedButton onClick={()=> this.handleCancelModalClick()}>Cancel</RaisedButton>
                  <RaisedButton>Confirm</RaisedButton>
                </div>
              </form>
            </Dialog>
          </FloatingActionButton>
        </div>
      </div>
    );
  }
}
