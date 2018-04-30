import React from "react";
import Menu from "../Menu/Menu";

import { RaisedButton } from "material-ui";
import BillingItem from "./BillingItem";
import {connect} from 'react-redux';


export class BillingView extends React.Component {
  render() {
    let arr = [];
    for (var i = 0; i < 15; i++) {
      arr.push(<BillingItem user={this.props.user}/>);
    }

    return (
      <div className="billing-view-container">
        <div className="billing-view-top-menu">
          <RaisedButton label="Invoice" />
          <RaisedButton label="Upload Invoice" />
          <RaisedButton label="Email Client" />
        </div>
        <div className="billing-items-container">Stuff Goes Here</div>
        {arr}

        <div className="billing-view-footer>">
          <RaisedButton label="Preview Invoice" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user : state.userReducer.user
  }
}


export default connect(mapStateToProps, null)(BillingView)