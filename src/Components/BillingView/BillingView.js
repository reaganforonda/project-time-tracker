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

import { withRouter } from "react-router-dom";

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
      bodyText: "",
      emailSnackBar: false,
      uploadSnackBar: false,
      signedUrl: "",
      selectedFile: {},
      submitDisabled: true,
      invoice: "",
      attachment: "",
      emailSubmit: true,
      invoiceButtonOpen: false,
      invoiceToDownload: "",
      downloadButtonDisabled: true
    };

    this.getBilling = this.getBilling.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleEmailModalClose = this.handleEmailModalClose.bind(this);
    this.handleEmailModalOpen = this.handleEmailModalOpen.bind(this);
    this.handleUploadModalOpen = this.handleUploadModalOpen.bind(this);
    this.handleUploadModalClose = this.handleUploadModalClose.bind(this);
    this.handleClientSelect = this.handleClientSelect.bind(this);
    this.handleEmailSend = this.handleEmailSend.bind(this);
    this.handleS3Upload = this.handleS3Upload.bind(this);
    this.handleCancelUploadModal = this.handleCancelUploadModal.bind(this);
    this.handleInvoiceSelect = this.handleInvoiceSelect.bind(this);
    this.handleEmailModalCancel = this.handleEmailModalCancel.bind(this);
    this.handleEmailStateReset = this.handleEmailStateReset.bind(this);
    this.handleInvoiceButtonClickOpen = this.handleInvoiceButtonClickOpen.bind(
      this
    );
    this.handleInvoiceModalCloseCancel = this.handleInvoiceModalCloseCancel.bind(
      this
    );
    this.handleClientSelectInvoice = this.handleClientSelectInvoice.bind(this);

    this.handleRequestCloseSnackbar = this.handleRequestCloseSnackbar.bind(this);
  }

  componentDidMount() {
    this.getBilling();
  }

  getBilling() {
    this.props.getBilling(this.props.user.user_id);
    this.props.getAllBilling(this.props.user.user_id);
    this.props.getAllClients(this.props.user.user_id);
    this.props.getLastBillingNumber(this.props.user.user_id)
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

  handleEmailModalCancel() {
    this.handleEmailModalClose();
    this.handleEmailStateReset();
  }

  handleEmailStateReset() {
    this.setState({
      selectedClient: "",
      toEmail: "",
      fromEmail: this.props.user.email,
      attachment: "",
      subject: "",
      bodyText: ""
    });
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
    this.setState({ toEmail: value.email });
    if (this.state.toEmail !== "" && this.state.fromEmail !== "") {
      this.setState({ emailSubmit: false });
    } else {
      this.setState({ emailSubmit: true });
    }
  };

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });

    if (this.state.toEmail !== "" && this.state.fromEmail !== "") {
      this.setState({ emailSubmit: false });
    } else {
      this.setState({ emailSubmit: true });
    }
  }

  handleEmailSend() {
    let email = {};

    if (this.state.attachment === "") {
      email = {
        toEmail: this.state.toEmail,
        fromEmail: this.state.fromEmail,
        subject: this.state.subject,
        message: this.state.bodyText
      };
    } else {
      email = {
        toEmail: this.state.toEmail,
        fromEmail: this.state.fromEmail,
        subject: this.state.subject,
        message: this.state.bodyText,
        attachments: [
          {
            path: this.state.attachment
          }
        ]
      };
    }

    axios
      .post("/api/email", email)
      .then(result => {
        console.log(result);
        this.setState({
          emailSnackBar: true,
          attachment: "",
          emailModalOpen: false
        });
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
    this.setState({ attachment: value });
  };

  handleInvoiceButtonClickOpen() {
    this.setState({ invoiceButtonOpen: true });
  }

  handleInvoiceModalCloseCancel() {
    this.setState({ invoiceButtonOpen: false });
    this.setState({
      selectedClient: "",
      downloadButtonDisabled: true
    });
  }

  handleClientSelectInvoice = (event, index, value) => {
    this.setState({ selectedClient: value });
  };

  handleInvoiceSelectDownload = (event, index, value) => {
    this.setState({ invoiceToDownload: value, downloadButtonDisabled: false });
  };

  handleRequestCloseSnackbar(){
    this.setState({emailSnackBar: false, uploadSnackBar : false})
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
      )
    });

    let clients = this.props.clients.map(client => {
      return (
        <MenuItem
          key={client.client_id}
          value={client}
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
          primaryText={`${value.client_name} - ${value.invoice_number}`}
          value={value.invoice_id}
        />
      );
    });

    let filteredInvoices = this.props.allBilling
      .filter(o => {
        return o.client_id === this.state.selectedClient.client_id;
      })
      .map(value => {
        return (
          <MenuItem
            key={value.invoice_id}
            primaryText={value.invoice_number}
            value={value}
          />
        );
      });

    let attachments = this.props.allBilling.filter(o=> {
      return o.client_id === this.state.selectedClient.client_id
    }).map(value => {
      return (
        <MenuItem
          key={value.invoice_id}
          primaryText={value.invoice_number}
          value={value.aws_file_location}
        />
      );
    });

    const stylePaper = {
      style : {
        backgroundColor : '#6B6E70'
    }}

    const buttonStyle1 = {
      labelColor : "white",
      backgroundColor: "#86C232"
    };

    const buttonStyle2 = {
      labelColor : "white",
      backgroundColor: "#86C232"
    }

    const overlayStyle = {
      backgroundColor: "rgba(0,0,0, .89)"
    }



    return (
      <div>
        {!this.props.user.user_id ? (
          this.props.history.push("/")
        ) : (
          <div className="billing-view-container">
            <div className="billing-view-top-menu">
              {/* DOWNLOAD INVOICES SECTION */}
              <RaisedButton
                label="INVOICES"
                backgroundColor={"#86C232"}
                labelColor={'#222629'}
                
                onClick={() => this.handleInvoiceButtonClickOpen()}
              >
                <Dialog
                  modal={true}
                  open={this.state.invoiceButtonOpen}
                  contentStyle={{ width: "fit-content" }}
                  paperProps = {stylePaper}
                  overlayStyle={overlayStyle}
                >
                  <SelectField
                    value={this.state.selectedClient}
                    onChange={this.handleClientSelectInvoice}
                    hintText="Select Client"
                    floatingLabelText="Select Client"
                    floatingLabelStyle={{color:'#86C232'}}
                    labelStyle={{color: "white"}}
                  >
                    {clients}
                  </SelectField>
                  <br />
                  <SelectField
                    value={this.state.invoiceToDownload}
                    onChange={this.handleInvoiceSelectDownload}
                    hintText="Select Invoice"
                    labelStyle={{color: "white"}}
                    floatingLabelStyle={{color:'#86C232'}}
                    floatingLabelText="Select Invoice"
                  >
                    {filteredInvoices}
                  </SelectField>
                  <div className="invoice-modal-buttons">
                    <RaisedButton
                      backgroundColor={buttonStyle1.backgroundColor}
                      labelColor={buttonStyle1.labelColor}
                      onClick={() => this.handleInvoiceModalCloseCancel()}
                      label="CANCEL"
                    />
                    <RaisedButton
                    backgroundColor={buttonStyle2.backgroundColor}
                    labelColor={buttonStyle2.labelColor}
                      href={this.state.invoiceToDownload.aws_file_location}
                      target="_blank"
                      disabled={this.state.downloadButtonDisabled}
                      label="DOWNLOAD"
                    />
                  </div>
                </Dialog>
              </RaisedButton>

              {/* UPLOAD INVOICE SECTION */}
              <RaisedButton
                onClick={() => this.handleUploadModalOpen()}
                label="UPLOAD INVOICE"
                backgroundColor={"#86C232"}
                labelColor={'#222629'}
                style={{marginLeft:'15px'}}
              >
                <Dialog
                  modal={true}
                  open={this.state.uploadModalOpen}
                  contentStyle={{ width: "fit-content" }}
                  paperProps = {stylePaper}
                  overlayStyle={overlayStyle}
                >
                  <SelectField
                    hintText="Name of Invoice"
                    floatingLabelText="Name of Invoice"
                    value={this.state.invoice}
                    onChange={this.handleInvoiceSelect}
                    labelStyle={{color: "white"}}
                    floatingLabelStyle={{color:'#86C232'}}
                    fullWidth={true}
                  >
                    {invoices}
                  </SelectField>

            <div className='dropzone-div'>
                  <Dropzone onDrop={this.onDrop}/>
                  <p style={{color: '#61892F'}}>Drop Invoice or click to select files to upload</p>
                  </div>
                  <div>{files}</div>
                  <div className="upload-buttons-div">
                    <RaisedButton
                    backgroundColor={buttonStyle1.backgroundColor}
                    labelColor={buttonStyle1.labelColor}
                    onClick={() => this.handleCancelUploadModal()}
                      label="CANCEL"
                    />
                    <RaisedButton
                    backgroundColor={buttonStyle2.backgroundColor}
                    labelColor={buttonStyle2.labelColor}
                      onClick={() => this.handleS3Upload()}
                      disabled={this.state.submitDisabled}
                      label="SUBMIT"
                    />
                  </div>
                </Dialog>
              </RaisedButton>

              {/* EMAIL INVOICE SECTION */}
              <RaisedButton
                onClick={() => this.handleEmailModalOpen()}
                label="EMAIL CLIENT"
                labelColor={'#222629'}
                backgroundColor={"#86C232"}
                style={{marginLeft:'15px'}}
              >
                <Dialog
                
                contentStyle={{ width: "fit-content", height: 'fit-content'}}
                  paperProps = {stylePaper}
                  overlayStyle={overlayStyle}
                  autoScrollBodyContent={true}
                modal={true} open={this.state.emailModalOpen}>


                    <div className='top-select-field-email'>
                      <SelectField
                        value={this.state.selectedClient}
                        onChange={(event, index, value) =>
                          this.handleClientSelect(event, index, value)
                        }
                        hintText="Select Client"
                        floatingLabelText="Select Client"
                        labelStyle={{color: "white"}}
                    floatingLabelStyle={{color:'#86C232'}}
                      >
                        {clients}
                      </SelectField>

                      <SelectField
                      
                        value={this.state.attachment}
                        onChange={(event, index, value) =>
                          this.handleAttachmentSelect(event, index, value)
                        }
                        hintText="Select Attachment"
                        floatingLabelText="Select Attachment"
                        labelStyle={{color: "white"}}
                    floatingLabelStyle={{color:'#86C232'}}
                      >
                        {attachments}
                      </SelectField>
                    </div>

                    <TextField
                    inputStyle={{color: 'white'}}
                    floatingLabelStyle={{color:'#86C232'}}
                      errorStyle={{color : '#000000', fontSize:'10px'}}
                      name="toEmail"
                      value={this.state.toEmail}
                      errorText="Required"
                      onChange={e => this.handleInputChange(e)}
                      hintText="TO:"
                      floatingLabelText="TO:"
                      underlineShow={false}
                    />
                    <Divider />
                    <TextField
                    floatingLabelStyle={{color:'#86C232'}}
                    inputStyle={{color: 'white'}}
                    errorStyle={{color : '#000000', fontSize:'10px'}}
                      name="fromEmail"
                      floatingLabelText="FROM:"
                      value={this.state.fromEmail}
                      onChange={e => this.handleInputChange(e)}
                      errorText="Required"
                      hintText="FROM:"
                      underlineShow={false}
                    />
                    <Divider />
                    <TextField
                    floatingLabelStyle={{color:'#86C232'}}
                    inputStyle={{color: 'white'}}
                      hintText="SUBJECT"
                      floatingLabelText="SUBJECT"
                      name="subject"
                      onChange={e => this.handleInputChange(e)}
                      value={this.state.subject}
                      underlineShow={false}
                    />
                    <Divider />
                    <TextField
                    autoScrollBodyContent={true}
                    floatingLabelStyle={{color:'#86C232'}}
                    inputStyle={{color: 'white', fontSize: '16px'}}
                    textareaStyle={{color: 'white', fontSize: '16px'}}
                    fullWidth={true}  
                    hintText="BODY"
                      floatingLabelText="BODY"
                      onChange={e => this.handleInputChange(e)}
                      name="bodyText"
                      multiLine={true}
                      rows={1}
                      underlineShow={false}
                      value={this.state.bodyText}
                      
                    />


                  <div className='email-modal-buttons'>
                    <RaisedButton
                    backgroundColor={buttonStyle1.backgroundColor}
                    labelColor={buttonStyle1.labelColor}
                      onClick={() => this.handleEmailModalCancel()}
                      label="CANCEL"
                    />
                    <RaisedButton backgroundColor={buttonStyle2.backgroundColor} labelColor={buttonStyle2.labelColor} onClick={() => this.handleEmailSend()} disabled={this.state.emailSubmit}
                      label="SUBMIT"
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
              onRequestClose={this.handleRequestCloseSnackbar}
              contentStyle={{color:'#86C232'}}
            />
            <Snackbar
              open={this.state.uploadSnackBar}
              message="Upload Successful"
              autoHideDuration={3000}
              onRequestClose={this.handleRequestCloseSnackbar}
              contentStyle={{color:'#86C232'}}
            />
          </div>
        )}
      </div>
    )
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
})(withRouter(BillingView));
