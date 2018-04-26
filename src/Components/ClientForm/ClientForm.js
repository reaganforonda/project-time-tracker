import React from "react";
import ContentAdd from "material-ui/svg-icons/content/add";
import {
  DatePicker,
  TimePicker,
  TextField,
  Dialog,
  RaisedButton,
  FloatingActionButton,
  MenuItem,
  SelectField
} from "material-ui";
import { connect } from "react-redux";

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
      phone: ""
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleCancelModalClick = this.handleCancelModalClick.bind(this);
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleOpenModal() {
    this.setState({ modalOpen: true });
  }

  handleCancelModalClick() {
    this.setState({
      modalOpen: false,
      clientName: "",
      address_one: "",
      address_two: "",
      city: "",
      state: "",
      zipcode: "",
      website: "",
      phone: ""
    });
  }

  render() {
    return (
      <div>
        <FloatingActionButton
          onClick={() => this.handleOpenModal()}
          mini={false}
          disabled={false}
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
                maxlength="2"
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

              <div>
                <RaisedButton
                  label="CANCEL"
                  secondary={true}
                  onClick={() => this.handleCancelModalClick()}
                />

                <RaisedButton label="CONFIRM" primary={true} />
              </div>
            </form>
          </Dialog>
        </FloatingActionButton>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
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
