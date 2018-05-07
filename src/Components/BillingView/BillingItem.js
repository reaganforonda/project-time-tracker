import React from "react";
import { Paper, Checkbox } from "material-ui";

import ActionFavorite from "material-ui/svg-icons/action/favorite";
import ActionFavoriteBorder from "material-ui/svg-icons/action/favorite-border";
import Visibility from "material-ui/svg-icons/action/visibility";
import VisibilityOff from "material-ui/svg-icons/action/visibility-off";

export default class BillingItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      billEnteries : []
    };

    this.handlCheckBox = this.handlCheckBox.bind(this);
  }

  handlCheckBox(){
    let oldState = this.state.checked;
    this.setState({checked : !oldState})
    
  }

  render() {
    return (
      <div>
        <Checkbox 
        checked={this.state.checked}
        onCheck = {this.handlCheckBox}
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
