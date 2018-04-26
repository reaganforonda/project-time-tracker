import React from "react";
import axios from "axios";

import ClientForm from "../ClientForm/ClientForm";
import Clients from "./Clients";

export default class ClientView extends React.Component {
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

  componentDidUpdate(){
    
  }

  // TODO: Fix to get only clients related to user

  getAllClients() {
    axios
      .get("http://localhost:3005/api/clients")
      .then(clients => {
        this.setState({ clients: clients.data });
      })
      .catch(e => {
        console.log(`Error: ${e}`);
      });
  }

  render() {
    let clientArr = this.state.clients.map(client => {
      return (
        <div key={client.client_id}>
          <Clients
          clientId = {client.client_id}
            name={client.client_name}
            addressOne={client.address_one}
            addressTwo={client.address_two}
            city={client.city}
            state={client.state}
            zicode={client.zip}
            website={client.website}
            phone={client.phone}
          />
        </div>
      );
    });
    return (
      <div className="clientview-container">
        <div className="clientlist-container" />
        {clientArr}
        <div className="floating-action">
          <ClientForm />
        </div>
      </div>
    );
  }
}
