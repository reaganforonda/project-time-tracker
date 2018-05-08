import React from "react";
import Menu from "../Menu/Menu";

import { Paper, RaisedButton, Dialog } from "material-ui";
import BillingItem from "./BillingItem";
import { connect } from "react-redux";
import { getBilling, getLastBillingNumber } from "../../ducks/billingReducer";
import { Link } from "react-router-dom";
import Dropzone from 'react-dropzone';

export class BillingView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      billing: [],
      uploadOpen : false,
      files : []
    };

    this.getBilling = this.getBilling.bind(this);
    this.handleUploadDialogOpen= this.handleUploadDialogOpen.bind(this);
    this.handleUploadDialogClose = this.handleUploadDialogClose.bind(this);
    this.onDrop = this.onDrop.bind(this)
    
  }

  componentDidMount() {
    this.getBilling();
    this.props.getLastBillingNumber(this.props.user.user_id);
  }

  getBilling() {
    this.props.getBilling(this.props.user.user_id);
  }

  handleUploadDialogOpen(){
    this.setState({uploadOpen : true})
  }

  handleUploadDialogClose(){
    this.setState({uploadOpen : false})
  }

onDrop(files) {
  this.setState({files})
  console.log(this.state.files)
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

    return (
      <div className="billing-view-container">
        <div className="billing-view-top-menu">
          
          <RaisedButton onClick={()=>this.handleUploadDialogOpen()}label="Upload Invoice">
            <Dialog modal={true} open={this.state.uploadOpen}>
            
            <Dropzone onDrop = {this.onDrop}>
              <p>
                Drop Invoice or click to select files to upload
              </p>
            </Dropzone>

            <RaisedButton onClick={()=>this.handleUploadDialogClose()}  label='Close'/>
            </Dialog>
          </RaisedButton>

          <RaisedButton label="Email Client" />
        </div>
        <div className="billing-items-container">{arr}</div>

        <div className="billing-view-footer>" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    billing: state.billingReducer.billing,
    selectedJob: state.billingReducer.selectedJob
  };
}

export default connect(mapStateToProps, { getBilling, getLastBillingNumber })(
  BillingView
);
