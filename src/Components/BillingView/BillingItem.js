import React from "react";
import { Paper, Checkbox } from "material-ui";

import ActionFavorite from "material-ui/svg-icons/action/favorite";
import ActionFavoriteBorder from "material-ui/svg-icons/action/favorite-border";
import Visibility from "material-ui/svg-icons/action/visibility";
import VisibilityOff from "material-ui/svg-icons/action/visibility-off";
import { connect } from "react-redux";

import {selectedForBilling} from '../../ducks/billingReducer'

export class BillingItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      billEnteries : [],
      selectJob : {},
      disabled : false
    };

    this.handlCheckBox = this.handlCheckBox.bind(this);
  }

  handlCheckBox(){
    let oldState = this.state.checked;
    let newState = !oldState
    this.setState({checked : newState})
    
    if(newState) {
      this.setState({selectJob : Object.assign({}, this.state.selectJob, this.props.job)})
      this.props.selectedForBilling(this.state.selectJob);
    } 
  }

  render() {

    return (
      <div>
        <Checkbox 
        checked={this.state.checked}
        onCheck = {()=>this.handlCheckBox()}
        />
        <Paper>
          <p>{this.props.jobId}</p> 
          <p>{this.props.jobName}</p>
          <p>{this.props.totalHrs}</p>
          <p>{this.props.total}</p>
          
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user : state.userReducer.user,
    selectedJob : state.billingReducer.selectedJob

  }
}

export default connect(mapStateToProps, {selectedForBilling})(BillingItem);