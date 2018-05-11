import React from "react";
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
import {
  getBilling,
  getLastBillingNumber,
  getAllBilling
} from "../../ducks/billingReducer";
import { getAllClients } from "../../ducks/clientReducer";
import Dropzone from "react-dropzone";
import numeral from "numeral";

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
      selectedFile: {},
      submitDisabled: true,
      invoice: "",
      attachment: '',
      emailSubmit: true
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
    this.handleCancelUploadModal = this.handleCancelUploadModal.bind(this);
    this.handleInvoiceSelect = this.handleInvoiceSelect.bind(this);
  }

  componentDidMount() {
    this.getBilling();
  }

  defaultBodyText() {
    let text = "Hello, Please find attached your invoice";

    return text;
  }

  getBilling() {
    this.props.getBilling(this.props.user.user_id);
    this.props.getAllBilling(this.props.user.user_id);
  }

  handleUploadModalOpen() {
    this.setState({ uploadModalOpen: true });
  }

  handleUploadModalClose() {
    this.setState({ uploadModalOpen: false });
  }

  handleCancelUploadModal() {
    this.setState({ uploadModalOpen: false });
    this.setState({ files: [], submitDisabled: true });
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
    this.setState({ submitDisabled: false });
  }

  handleClientSelect = (event, index, value) => {
    this.setState({ selectedClient: value });
    this.setState({ toEmail: value });
    if(this.state.toEmail !== '' && this.state.fromEmail !== '') {
      this.setState({emailSubmit : false})
    } else {
      this.setState({emailSubmit : true})
    }
  };

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    
    if(this.state.toEmail !== '' && this.state.fromEmail !== '') {
      this.setState({emailSubmit : false})
    } else {
      this.setState({emailSubmit : true})
    }
  }

  handleEmailSend() {
    let email = {
      toEmail: this.state.toEmail,
      fromEmail: this.state.fromEmail,
      subject: this.state.subject,
      message: this.state.bodyText,
      attachments : [
          {
            path: this.state.attachment
          }
      ]
    };

    axios
      .post("/api/email", email)
      .then(result => {
        console.log(result);
        this.setState({ emailSnackBar: true, attachment: '', emailModalOpen:false });

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
      .post(`/api/s3/upload`, upload)
      .then(result => {
        let signedURL = result.data;

        axios
          .put(signedURL, file, options)
          .then(result => {
            console.log(result);
            this.setState({
              uploadModalOpen: false,
              uploadSnackBar: true,
              submitDisabled: true
            });
            let awsFileName = { key: upload.filename };
            console.log(awsFileName);
            axios
              .put(
                `/api/billing/update/invoice/${this.props.user.user_id}/${
                  this.state.invoice
                }`,
                awsFileName
              )
              .then(result => {
                console.log(result.data);
                this.setState({
                  files: []
                });
              });
          })
          .catch(e => {
            console.log(`Error PUT - Attempted Upload to Amazon S3: ${e}`);
          });
      })
      .catch(e => {
        console.log(`Error POST - Attempted to get Signed URL : ${e}`);
      });
  }

  handleInvoiceSelect = (event, index, value) => {
    this.setState({ invoice: value });
  };

  handleAttachmentSelect = (event, index, value) => {
    console.log(value);
    this.setState({attachment : value})
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
      return <p key={file.name}>{file.name}</p>;
    });

    let invoices = this.props.allBilling.map(value => {
      return (
        <MenuItem
          key={value.invoice_id}
          primaryText={value.invoice_number}
          value={value.invoice_id}
        />
      );
    });

    let attachments = this.props.allBilling.map(value => {
      return (
        <MenuItem
          key={value.invoice_id}
          primaryText={value.invoice_number}
          value={value.aws_file_location}
        />
      );
    });

    return (
      <div className="billing-view-container">
        <div className="billing-view-top-menu">
          <RaisedButton
            onClick={() => this.handleUploadModalOpen()}
            label="UPLOAD INVOICE"
            backgroundColor={"#EB7F00"}
          >
            <Dialog
              modal={true}
              open={this.state.uploadModalOpen}
              contentStyle={{ width: "fit-content" }}
            >
              <SelectField
                hintText="Select Invoice"
                floatingLabelText="Select Invoice"
                value={this.state.invoice}
                onChange={this.handleInvoiceSelect}
              >
                {invoices}
              </SelectField>
              <Dropzone onDrop={this.onDrop}>
                <p>Drop Invoice or click to select files to upload</p>
              </Dropzone>
              <div>{files}</div>
              <div className="upload-buttons-div">
                <RaisedButton
                  onClick={() => this.handleCancelUploadModal()}
                  label="CANCEL"
                />
                <RaisedButton
                  onClick={() => this.handleS3Upload()}
                  disabled={this.state.submitDisabled}
                  label="SUBMIT"
                />
              </div>
            </Dialog>
          </RaisedButton>

          <RaisedButton
            onClick={() => this.handleEmailModalOpen()}
            label="EMAIL CLIENT"
            backgroundColor={"#EB7F00"}
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
                <div>
                  <SelectField
                    value={this.state.attachment}
                    onChange={(event, index, value) =>
                      this.handleAttachmentSelect(event, index, value)
                    }
                    hintText="Select Attachment"
                    floatingLabelText="Select Attachment"
                  >
                    {attachments}
                  </SelectField>
                </div>

                <TextField
                  name="toEmail"
                  value={this.state.toEmail}
                  errorText='Required'
                  onChange={e => this.handleInputChange(e)}
                  hintText="TO"
                  underlineShow={false}
                />
                <Divider />
                <TextField
                  name="fromEmail"
                  value={this.state.fromEmail}
                  onChange={e => this.handleInputChange(e)}
                  errorText='Required'
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
                  disabled={this.state.emailSubmit}
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
    clients: state.clientReducer.clients,
    allBilling: state.billingReducer.allBilling
  };
}

export default connect(mapStateToProps, {
  getBilling,
  getLastBillingNumber,
  getAllClients,
  getAllBilling
})(BillingView);
