import React from "react";
import { Paper, TextField, FlatButton, RaisedButton, Dialog } from "material-ui";

import ActionFavorite from "material-ui/svg-icons/action/favorite";
import ActionFavoriteBorder from "material-ui/svg-icons/action/favorite-border";
import Visibility from "material-ui/svg-icons/action/visibility";
import VisibilityOff from "material-ui/svg-icons/action/visibility-off";
import { connect } from "react-redux";

import { selectedForBilling } from "../../ducks/billingReducer";

export class BillingItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ open: true });
  }

  handleCloseModal() {
    this.setState({ open: false });
  }

  hanleSetInvoiceNumber(){
    
  }

  render() {
    return (
      <div>
        <Paper>
          <p>{this.props.jobId}</p>
          <p>{this.props.jobName}</p>
          <p>{this.props.totalHrs}</p>
          <p>{this.props.total}</p>
          <FlatButton
            onClick={() => this.handleOpenModal()}
            label="Select For Billing"
          >
            <Dialog modal={true} open={this.state.open}>
              <TextField errorText='Required' hintText='Enter Invoice Number' floatingLabelText='Enter Invoice Number'/>
              <RaisedButton onClick={()=>this.handleCloseModal()} label="Cancel" />
              <RaisedButton job={this.props.job} label="Preview" />
              <RaisedButton job={this.props.job} label="Generate PDF" />
            </Dialog>
          </FlatButton>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    selectedJob: state.billingReducer.selectedJob
  };
}

export default connect(mapStateToProps, {})(BillingItem);
