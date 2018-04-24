import React from "react";
import Menu from "../Menu/Menu";
import Jobs from "../Jobs/Jobs";
import axios from "axios";
import DropDownMenu from 'material-ui/DropDownMenu';
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import DatePicker from "material-ui/DatePicker";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";

import {getUser} from '../../ducks/reducer';
import {connect} from 'react-redux';

export class JobView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      jobName: "",
      jobDescription: "",
      startDate: null,
      hourlyRate: 0,
      user_name : '',
      img : "",
    };

    this.handleAddJobClick = this.handleAddJobClick.bind(this);
    this.handleCancelModalClick = this.handleCancelModalClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.handleNonUserLogin = this.handleNonUserLogin.bind(this);
  }

  componentDidMount(){
    this.props.getUser();
    this.setState({user_name : this.props.user.user_name})
  }

  
  handleAddJobClick() {
    this.setState({ modalOpen: true });
  }

  handleCancelModalClick() {
    this.setState({
      modalOpen: false,
      jobName: "",
      jobDescription: "",
      startDate: null,
      hourlyRate: 0
    });
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDateChange(e, date) {
    this.setState({ startDate: date });
  }

  handleJobSubmit() {
    // TODO: ALSO BIND THIS THING!!!
  }

  // Formate Datepicker's date to something for useable
  formatDate(date){
    let formatedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    return formatedDate;
    
  }

  handleNonUserLogin(){
    return <Dialog label='Login Error' modal={true} open={true}/>
  }

  render() {
    let {picture, user_name} = this.props.user;
    console.log(this.props.user)
    return (
      <div>
        <div className="menu">
          <Menu img={picture} userName={user_name}/>
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
                <TextField
                  value={this.state.jobName}
                  onChange={e => this.handleTextChange(e)}
                  name="jobName"
                  hintText="Job Name"
                  floatingLabelText="Job Name"
                />
                <TextField
                  value={this.state.jobDescription}
                  onChange={e => this.handleTextChange(e)}
                  name="jobDescription"
                  hintText="Job Description"
                  floatingLabelText="Job Description"
                />
                <DatePicker
                  
                  autoOk={true}
                  value={this.state.startDate}
                  onChange={this.handleDateChange}
                  name="startDate"
                  hintText="Job Start Date"
                  floatingLabelText="Job Start Date"
                />
                <TextField
                  type="number"
                  value={this.state.hourlyRate}
                  onChange={e => this.handleTextChange(e)}
                  name="hourlyRate"
                  hintText="Hourly Rate"
                  floatingLabelText="Hourly Rate"
                />
                <div>
                  <RaisedButton onClick={() => this.handleCancelModalClick()}>
                    Cancel
                  </RaisedButton>
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

function mapStateToProps(state){
  return {
    user : state.user
  }
};

export default connect(mapStateToProps, {getUser})(JobView);