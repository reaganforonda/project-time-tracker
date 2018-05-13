import React from "react";
import axios from "axios";

import ClientForm from "../ClientForm/ClientForm";
import Clients from "./Clients";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getAllClients } from "../../ducks/clientReducer";

export class ClientView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clients: []
    };
  }

  componentDidMount() {
    this.props.getAllClients(this.props.user.user_id);
  }

  render() {
    let clientArr = this.props.clients.map(client => {
      return (
        
          <Clients
          key={client.client_id}
            clientId={client.client_id}
            name={client.client_name}
            addressOne={client.address_one}
            addressTwo={client.address_two}
            city={client.city}
            state={client.state}
            zicode={client.zip}
            website={client.website}
            phone={client.phone}
            email={client.email}
            client={client}
          />
        
      );
    });
    return (
      <div>
        
        {!this.props.user.user_id ? (
          this.props.history.push("/")
        ) : (
          <div className="clientview-container">
            <div className="clientlist-container"></div>
            {clientArr}
            <div className="floating-action">
              <ClientForm getClients={this.getAllClients} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    clients: state.clientReducer.clients
  };
}

export default connect(mapStateToProps, { getAllClients })(
  withRouter(ClientView)
);
