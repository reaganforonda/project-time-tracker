import React from "react";
import Menu from "../Menu/Menu";

import { Paper, RaisedButton } from "material-ui";
import BillingItem from "./BillingItem";
import { connect } from "react-redux";

import { getAllClients } from "../../ducks/billingReducer";

export class BillingView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clients: []
    };

    this.getAllClients = this.getAllClients.bind(this);
  }

  componentDidMount() {
    this.getAllClients();
  }

  getAllClients() {
    this.props.getAllClients(this.props.user.user_id);
    this.setState({ clients: this.props.clients });
  }

  render() {
    let clientArr = this.state.clients.map(client => {
      return (
        <div kye={client.clien_id}>
          <Paper>{client.client_name}</Paper>
        </div>
      );
    });

    return (
      <div className="billing-view-container">
        <div className="billing-view-top-menu">
          <RaisedButton label="Invoice" />
          <RaisedButton label="Upload Invoice" />
          <RaisedButton label="Email Client" />
        </div>
        <div className="billing-items-container">{clientArr}</div>

        <div className="billing-view-footer>">
          <RaisedButton label="Preview Invoice" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    clients: state.billingReducer.clients
  };
}

export default connect(mapStateToProps, { getAllClients })(BillingView);
