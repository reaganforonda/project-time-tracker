import React from "react";
import ContentAdd from "material-ui/svg-icons/content/add";
import Phone from "material-ui/svg-icons/maps/local-phone";
import {
  TextField,
  Dialog,
  RaisedButton,
  FloatingActionButton
} from "material-ui";
import {
  updateAddressOne,
  updateAddressTwo,
  updateCity,
  updateClientName,
  updateState,
  updatePhone,
  updateZip,
  updateWebsite
} from "../../ducks/clientReducer";
import axios from "axios";
import { connect } from "react-redux";

export class ClientForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      clientName: "",
      address_one: "",
      address_two: "",
      city: "",
      state: "",
      zipcode: "",
      website: "",
      phone: "",
      country: ""
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleCancelModalClick = this.handleCancelModalClick.bind(this);
    this.handleAddClient = this.handleAddClient.bind(this);
    this.handleResetState = this.handleResetState.bind(this);
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleOpenModal() {
    this.setState({ modalOpen: true });
  }

  handleCancelModalClick() {
    this.handleResetState();
  }

  handleAddClient() {
    let client = {
      user_id: this.props.user.user_id,
      client_name: this.state.clientName,
      address_one: this.state.address_one,
      address_two: this.state.address_two,
      city: this.state.city,
      state: this.state.state,
      phone: this.state.phone,
      country: this.state.country,
      website: this.state.website,
      zip: this.state.zipcode,
      active: true
    };

    axios
      .post("/api/client/", client)
      .then(result => {
        console.log(result);
        this.props.getAllClients(this.props.user.user_id);
      })
      .catch(e => {
        console.log(e);
      });

    this.handleResetState();
    
  }

  handleResetState() {
    this.setState({
      modalOpen: false,
      clientName: "",
      address_one: "",
      address_two: "",
      city: "",
      state: "",
      zipcode: "",
      website: "",
      phone: "",
      country: ""
    });

    this.props.getAllClients(this.props.user.user_id);
  }

  render() {
    return (
      <div>
        <FloatingActionButton
          onClick={() => this.handleOpenModal()}
          mini={false}
          disabled={false}
          zDepth={4}
          backgroundColor='#86C232'
        >
          <ContentAdd />
          <Dialog modal={true} open={this.state.modalOpen}>
            <form className="client-entry-form">
              <TextField
                type="text"
                value={this.state.clientName}
                onChange={e => this.handleTextChange(e)}
                name="clientName"
                hintText="Client Name"
                floatingLabelText="Client Name"
              />

              <TextField
                type="text"
                value={this.state.address_one}
                onChange={e => this.handleTextChange(e)}
                name="address_one"
                hintText="Address"
                floatingLabelText="Address"
              />

              <TextField
                type="text"
                value={this.state.address_two}
                onChange={e => this.handleTextChange(e)}
                name="address_two"
                hintText="Address Cont."
                floatingLabelText="Address Cont."
              />

              <TextField
                type="text"
                value={this.state.city}
                onChange={e => this.handleTextChange(e)}
                name="city"
                hintText="City"
                floatingLabelText="City"
              />

              <TextField
                type="text"
                value={this.state.state}
                maxLength="2"
                onChange={e => this.handleTextChange(e)}
                name="state"
                hintText="State"
                floatingLabelText="State"
              />

              <TextField
                type="Number"
                value={this.state.zipcode}
                onChange={e => this.handleTextChange(e)}
                name="zipcode"
                hintText="Zip Code"
                floatingLabelText="Zip Code"
              />

              <TextField
                type="text"
                value={this.state.country}
                onChange={e => this.handleTextChange(e)}
                name="country"
                hintText="Country"
                floatingLabelText="Country"
              />

              <TextField
                type="text"
                value={this.state.website}
                onChange={e => this.handleTextChange(e)}
                name="website"
                hintText="Website"
                floatingLabelText="Website"
              />

              <TextField
                type="text"
                value={this.state.phone}
                onChange={e => this.handleTextChange(e)}
                name="phone"
                hintText="Phone"
                floatingLabelText="Phone"
              />

              <TextField
                type="email"
                value={this.state.email}
                onChange={e => this.handleTextChange(e)}
                name="email"
                hintText="Email"
                floatingLabelText="Email"
              />

              <div>
                <RaisedButton
                  label="CANCEL"
                  secondary={true}
                  onClick={() => this.handleCancelModalClick()}
                />

                <RaisedButton
                  onClick={() => this.handleAddClient()}
                  label="CONFIRM"
                  primary={true}
                />
              </div>
            </form>
          </Dialog>
        </FloatingActionButton>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  };
}

export default connect(mapStateToProps, {
  updateClientName,
  updateAddressOne,
  updateAddressTwo,
  updateCity,
  updateState,
  updateZip,
  updatePhone,
  updateWebsite
})(ClientForm);
