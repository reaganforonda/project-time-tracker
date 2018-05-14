import React from "react";
import axios from "axios";
import ContentAdd from "material-ui/svg-icons/content/add";
import {
  Dialog,
  TextField,
  DatePicker,
  RaisedButton,
  FlatButton,
  FloatingActionButton,
  MenuItem,
  SelectField,
  Snackbar
} from "material-ui";

import { connect } from "react-redux";
import { getAllActiveJobs, getOffTheClockJobs } from "../../ducks/jobReducer";

export class JobForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      jobName: "",
      jobDescription: "",
      startDate: null,
      hourlyRate: 0,
      clients: [],
      client: "",
      snackbar: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCancelModalClick = this.handleCancelModalClick.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.handleGetClients = this.handleGetClients.bind(this);
    this.handleClientSelect = this.handleClientSelect.bind(this);
    this.handleAddJob = this.handleAddJob.bind(this);

    this.handleOnConfirm = this.handleOnConfirm.bind(this);
    this.handleResetState = this.handleResetState.bind(this);
    this.handleRequestCloseSnackbar = this.handleRequestCloseSnackbar.bind(this);
  }

  componentDidMount() {
    this.handleGetClients();
  }
  handleRequestCloseSnackbar(){
    this.setState({snackbar: false})
  }

  handleCancelModalClick() {
    this.handleResetState();
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDateChange(e, date) {
    this.setState({ startDate: this.formatDate(date) });
  }

  handleOpenModal() {
    this.setState({ modalOpen: true });
  }

  // Formate Datepicker's date to something for useable for postgres sql
  formatDate(date) {
    let formatedDate = `${date.getMonth() +
      1}/${date.getDate()}/${date.getFullYear()}`;
    return formatedDate;
  }

  handleGetClients() {
    axios
      .get(`/api/clients/${this.props.user.user_id}`)
      .then(clients => {
        this.setState({ clients: clients.data });
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleClientSelect = (event, index, value) => {
    this.setState({ client: value });
  };

  handleAddJob() {
    let job = {
      client_id: this.state.client,
      user_id: this.props.user.user_id,
      job_name: this.state.jobName,
      start_date: this.state.startDate,
      completed: false,
      rate: this.state.hourlyRate,
      description: this.state.jobDescription
    };

    axios
      .post(`/api/job`, job)
      .then(result => {
        console.log(result.data);
        this.setState({snackbar: true})
      })
      .catch(e => {
        console.log(`${e}`);
      });

    this.props.getAllActiveJobs(this.props.user.user_id);
  }

  handleOnConfirm() {
    this.handleAddJob();
    this.setState({ modalOpen: false });
    this.handleResetState();
    this.props.getOffTheClockJobs(this.props.user.user_id);
  }

  handleResetState() {
    this.setState({
      modalOpen: false,
      jobName: "",
      jobDescription: "",
      startDate: null,
      hourlyRate: 0,
      client: ""
    });
  }

  render() {
    let clientArr = this.state.clients.map(client => {
      return (
        <MenuItem
          key={client.client_id}
          primaryText={client.client_name}
          value={client.client_id}
        />
      );
    });

    const stylePaper = {
      style : {
        backgroundColor : '#6B6E70'
    }}

    const overlayStyle = {
      backgroundColor: "rgba(0,0,0, .89)"
    }

    const buttonStyle1 = {
      labelColor : "white",
      backgroundColor: "#86C232"
    };

    return (
      <div>
        <FloatingActionButton
          onClick={() => this.handleOpenModal()}
          mini={false}
          disabled={false}
          zDepth={4}
          backgroundColor='#EB7F00'
          backgroundColor='#86C232'
        >
          <ContentAdd className='content-add'/>
          <Dialog modal={true} open={this.state.modalOpen}
          contentStyle={{ width: "fit-content", height: 'fit-content', minWidth:'400px'}}
          paperProps = {stylePaper}
          overlayStyle={overlayStyle}
          autoScrollBodyContent={true}
          >
            <SelectField
            labelStyle={{color: "white"}}
            floatingLabelStyle={{color:'#86C232'}}
            fullWidth={true}
              hintText="Select Client"
              floatingLabelText="Select Client"
              value={this.state.client}
              onChange={(event, index, value) =>
                this.handleClientSelect(event, index, value)
              }
            >
              {clientArr}
            </SelectField>
            <form className="job-entry-form">
              <TextField
              inputStyle={{color: 'white'}}
              fullWidth={true}
              floatingLabelStyle={{color:'#86C232'}}
              underlineFocusStyle={{borderColor: "#86C232" }}
                value={this.state.jobName}
                onChange={e => this.handleTextChange(e)}
                name="jobName"
                hintText="Job Name"
                floatingLabelText="Job Name"
              />
              <TextField
              inputStyle={{color: 'white'}}
              fullWidth={true}
              floatingLabelStyle={{color:'#86C232'}}
              underlineFocusStyle={{borderColor: "#86C232" }}
                value={this.state.jobDescription}
                onChange={e => this.handleTextChange(e)}
                name="jobDescription"
                hintText="Job Description"
                floatingLabelText="Job Description"
              />

              <DatePicker
              fullWidth={true}
              textFieldStyle={{color: 'white'}}
              inputStyle={{color: 'white'}}
              floatingLabelStyle={{color:'#86C232'}}
              underlineFocusStyle={{borderColor: "#86C232" }}
                onChange={this.handleDateChange}
                name="startDate"
                hintText="Job Start Date"
                floatingLabelText="Job Start Date"
              />

              <TextField
              inputStyle={{color: 'white'}}
              fullWidth={true}
              floatingLabelStyle={{color:'#86C232'}}
              underlineFocusStyle={{borderColor: "#86C232" }}
                type="number"
                min={0}
                value={this.state.hourlyRate}
                onChange={e => this.handleTextChange(e)}
                name="hourlyRate"
                hintText="Hourly Rate"
                floatingLabelText="Hourly Rate"
              />
              <div className='job-form-buttons'>
                <RaisedButton
                style={{backgroundColor: '#86C232'}}
                backgroundColor={buttonStyle1.backgroundColor}
                labelColor={buttonStyle1.labelColor}
                  label="CANCEL"
    
                  onClick={() => this.handleCancelModalClick()}
                />
                <RaisedButton 
                style={{backgroundColor: '#86C232'}}
                onClick={() => this.handleOnConfirm()}
                label="CONFIRM"
                backgroundColor={buttonStyle1.backgroundColor} 
                labelColor={buttonStyle1.labelColor}
                />
              </div>
            </form>
          </Dialog>
        </FloatingActionButton>
        <Snackbar
              open={this.state.snackbar}
              message="Job Added"
              autoHideDuration={3000}
              onRequestClose={this.handleRequestCloseSnackbar}
              contentStyle={{color:'#86C232'}}
            />
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  };
}

export default connect(mapStateToProps, { getAllActiveJobs, getOffTheClockJobs })(JobForm);
