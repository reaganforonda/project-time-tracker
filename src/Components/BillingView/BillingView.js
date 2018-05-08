import React from "react";
// import Menu from "../Menu/Menu"; TODO: REMOVE
import axios from "axios";

import {
  Paper,
  RaisedButton,
  Dialog,
  TextField,
  Divider,
  MenuItem,
  SelectField,
  Snackbar
} from "material-ui";
import BillingItem from "./BillingItem";
import { connect } from "react-redux";
import { getBilling, getLastBillingNumber } from "../../ducks/billingReducer";
import { getAllClients } from "../../ducks/clientReducer";
// import { Link } from "react-router-dom"; TODO: REMOVE
import Dropzone from "react-dropzone";

export class BillingView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      billing: [],
      uploadModalOpen: false,
      emailModalOpen: false,
      files: [],
      selectedClient: "",
      fromEmail: this.props.user.email,
      toEmail: "",
      subject: "",
      bodyText: this.defaultBodyText(),
      emailSnackBar: false,
      uploadSnackBar: false,
      signedUrl: "",
      selectedFile: {}
    };

    this.getBilling = this.getBilling.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleEmailModalClose = this.handleEmailModalClose.bind(this);
    this.handleEmailModalOpen = this.handleEmailModalOpen.bind(this);
    this.handleUploadModalOpen = this.handleUploadModalOpen.bind(this);
    this.handleUploadModalClose = this.handleUploadModalClose.bind(this);
    this.handleClientSelect = this.handleClientSelect.bind(this);
    this.handleEmailSend = this.handleEmailSend.bind(this);
    this.defaultBodyText = this.defaultBodyText.bind(this);
    this.handleS3Upload = this.handleS3Upload.bind(this);
  }

  componentDidMount() {
    this.getBilling();
    this.props.getLastBillingNumber(this.props.user.user_id);
  }

  defaultBodyText() {
    let text = "Hello, Please find attached your invoice";

    return text;
  }

  getBilling() {
    this.props.getBilling(this.props.user.user_id);
  }

  handleUploadModalOpen() {
    this.setState({ uploadModalOpen: true });
  }

  handleUploadModalClose() {
    this.setState({ uploadModalOpen: false });
  }

  handleEmailModalOpen() {
    this.setState({ emailModalOpen: true });
    this.props.getAllClients(this.props.user.user_id);
  }

  handleEmailModalClose() {
    this.setState({ emailModalOpen: false });
  }

  onDrop(files) {
    this.setState({ files });
  }

  handleClientSelect = (event, index, value) => {
    console.log(value);
    this.setState({ selectedClient: value });
    this.setState({ toEmail: value });
  };

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleEmailSend() {
    let email = {
      toEmail: this.state.toEmail,
      fromEmail: this.state.fromEmail,
      subject: this.state.subject,
      message: this.state.bodyText
    };

    axios
      .post("http://localhost:3005/api/email", email)
      .then(result => {
        console.log(result);
        this.setState({ emailSnackBar: true });
      })
      .catch(e => {
        console.log(`Error while trying to send email front end : ${e}`);
      });
  }

  handleS3Upload() {
    let file = this.state.files[0];

    let upload = {
      filename: file.name,
      filetype: file.type
    };
    var options = {
      headers: {
        "Content-type": file.type
      }
    };
    console.log(upload);

    axios
      .post(`http://localhost:3005/api/s3/upload`, upload)
      .then(result => {
        let signedURL = result.data;

        axios
          .put(signedURL, file, options)
          .then(result => {
            console.log(result);
            this.setState({ uploadModalOpen: false, uploadSnackBar: true });
          })
          .catch(e => {
            console.log(`Error during PUT to Amazon S3: ${e}`);
          });
      })
      .catch(e => {
        console.log(`Error POST trying to get signed url : ${e}`);
      });
  }

  render() {
    let arr = this.props.billing.map(value => {
      return (
        <div key={value.job_id}>
          <BillingItem
            job={value}
            jobId={value.job_id}
            jobName={value.job_name}
            totaHrs={value.total_hrs}
            total={value.total}
          />
        </div>
      );
    });

    let clients = this.props.clients.map(client => {
      return (
        <MenuItem
          key={client.client_id}
          value={client.email}
          primaryText={client.client_name}
        />
      );
    });

    let files = this.state.files.map(file => {
      return (
        <p key={file.name}>
          {file.name} {file.size} bytes
        </p>
      );
    });

    return (
      <div className="billing-view-container">
        <div className="billing-view-top-menu">
          <RaisedButton
            onClick={() => this.handleUploadModalOpen()}
            label="Upload Invoice"
          >
            <Dialog modal={true} open={this.state.uploadModalOpen}>
              <Dropzone onDrop={this.onDrop}>
                <p>Drop Invoice or click to select files to upload</p>
              </Dropzone>
              <div>{files}</div>
              <div>
                <RaisedButton
                  onClick={() => this.handleUploadModalClose()}
                  label="Close"
                />
                <RaisedButton
                  onClick={() => this.handleS3Upload()}
                  label="Submit"
                />
              </div>
            </Dialog>
          </RaisedButton>

          <RaisedButton
            onClick={() => this.handleEmailModalOpen()}
            label="Email Client"
          >
            <Dialog modal={true} open={this.state.emailModalOpen}>
              <Paper>
                <div>
                  <SelectField
                    value={this.state.selectedClient}
                    onChange={(event, index, value) =>
                      this.handleClientSelect(event, index, value)
                    }
                    hintText="Select Client"
                    floatingLabelText="Select Client"
                  >
                    {clients}
                  </SelectField>
                </div>

                <TextField
                  name="toEmail"
                  value={this.state.toEmail}
                  onChange={e => this.handleInputChange(e)}
                  hintText="TO"
                  underlineShow={false}
                />
                <Divider />
                <TextField
                  name="fromEmail"
                  value={this.state.fromEmail}
                  onChange={e => this.handleInputChange(e)}
                  hintText="FROM"
                  underlineShow={false}
                />
                <Divider />
                <TextField
                  hintText="SUBJECT"
                  name="subject"
                  onChange={e => this.handleInputChange(e)}
                  value={this.state.subject}
                  underlineShow={false}
                />
                <Divider />
                <TextField
                  hintText="BODY"
                  multiLine={true}
                  rows={4}
                  underlineShow={false}
                />
              </Paper>

              <div>
                <RaisedButton
                  onClick={() => this.handleEmailModalClose()}
                  label="Cancel"
                />
                <RaisedButton
                  onClick={() => this.handleEmailSend()}
                  label="Submit"
                />
              </div>
            </Dialog>
          </RaisedButton>
        </div>
        <div className="billing-items-container">{arr}</div>
        <div className="billing-view-footer>" />
        <Snackbar
          open={this.state.emailSnackBar}
          message="Email Sent"
          autoHideDuration={3000}
        />
        <Snackbar
          open={this.state.uploadSnackBar}
          message="Upload Successful"
          autoHideDuration={3000}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    billing: state.billingReducer.billing,
    selectedJob: state.billingReducer.selectedJob,
    clients: state.clientReducer.clients
  };
}

export default connect(mapStateToProps, {
  getBilling,
  getLastBillingNumber,
  getAllClients
})(BillingView);
