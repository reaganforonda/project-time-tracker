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
  getAllClients,
  updateWebsite,
  getLocation
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
      country: "",
      disable: true
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleCancelModalClick = this.handleCancelModalClick.bind(this);
    this.handleAddClient = this.handleAddClient.bind(this);
    this.handleResetState = this.handleResetState.bind(this);
  }

  

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if(this.state.disable !== '') {
      this.setState({disable:false})
    }
  }

  handleOpenModal() {
    this.setState({ modalOpen: true });
  }

  handleCancelModalClick() {
    this.handleResetState();
  }

  handleAddClient() {


    let loc = {
      address : this.state.address_one,
      city : this.state.city,
      state : this.state.state
    }
    
    axios.post(`/api/google/geocoding`, loc).then((result) => {
      let lan = result.data.lat;
      let long = result.data.lng;
      
      

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
        active: true,
        lan : lan,
        long : long,
      };

      console.log(client);

      axios
      .post("/api/client/", client)
      .then(result => {
        console.log(result);
        this.props.getAllClients(this.props.user.user_id);
        this.handleResetState();
      })
      .catch(e => {
        console.log(e);
      });
    })

    

    
    
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
      country: "",
      disable: true
    });

    this.props.getAllClients(this.props.user.user_id);
  }

  render() {

    const stylePaper = {
      style : {
        backgroundColor : '#6B6E70'
    }}

    const buttonStyle1 = {
      labelColor : "white",
      backgroundColor: "#86C232"
    };

    const buttonStyle2 = {
      labelColor : "white",
      backgroundColor: "#86C232"
    }

    const overlayStyle = {
      backgroundColor: "rgba(0,0,0, .89)"
    }



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
          <Dialog 
            contentStyle={{ width: "fit-content" }}
            paperProps = {stylePaper}
            overlayStyle={overlayStyle}
            autoScrollBodyContent={true}
            modal={true} open={this.state.modalOpen}>
      
              <TextField
              underlineFocusStyle={{borderColor: "#86C232" }}
                floatingLabelStyle={{color:'#86C232'}}
                inputStyle={{color: 'white'}}
                errorStyle={{color : 'black', fontSize:'10px'}}
                errorText="Required"
                type="text"
                value={this.state.clientName}
                onChange={e => this.handleTextChange(e)}
                fullWidth={true}
                name="clientName"
                hintText="Client Name"
                floatingLabelText="Client Name"
              /><br/>


              <TextField
              underlineFocusStyle={{borderColor: "#86C232" }}
              floatingLabelStyle={{color:'#86C232'}}
              inputStyle={{color: 'white'}}
                type="text"
                value={this.state.address_one}
                onChange={e => this.handleTextChange(e)}
                name="address_one"
                hintText="Address"
                floatingLabelText="Address"
                fullWidth={true}
              />
              <br/>

              <TextField
              underlineFocusStyle={{borderColor: "#86C232" }}
              floatingLabelStyle={{color:'#86C232'}}
              inputStyle={{color: 'white'}}
                type="text"
                value={this.state.address_two}
                onChange={e => this.handleTextChange(e)}
                name="address_two"
                hintText="Address Cont."
                floatingLabelText="Address Cont."
                fullWidth={true}
              /><br/>
<div style={{display:'flex', justifyContent:'space-between'}}>
              <TextField
              style={{width:'56%'}}
              underlineFocusStyle={{borderColor: "#86C232" }}
              floatingLabelStyle={{color:'#86C232'}}
              inputStyle={{color: 'white'}}
                type="text"
                value={this.state.city}
                onChange={e => this.handleTextChange(e)}
                name="city"
                hintText="City"
                floatingLabelText="City"
                fullWidth={true}
              />

              <TextField
              style={{width:'16%%', marginLeft:'20px', marginRight:'20px'}}
              underlineFocusStyle={{borderColor: "#86C232" }}
              floatingLabelStyle={{color:'#86C232'}}
              inputStyle={{color: 'white'}}
              className='client-input-state'
                type="text"
                value={this.state.state}
                maxLength="2"
                onChange={e => this.handleTextChange(e)}
                name="state"
                hintText="State"
                floatingLabelText="State"
              />

              <TextField
              underlineFocusStyle={{borderColor: "#86C232" }}
              floatingLabelStyle={{color:'#86C232'}}
              inputStyle={{color: 'white'}}
                type="Number"
                value={this.state.zipcode}
                onChange={e => this.handleTextChange(e)}
                name="zipcode"
                hintText="Zip Code"
                floatingLabelText="Zip Code"
              />
              <br/>

              </div>

              <TextField
              underlineFocusStyle={{borderColor: "#86C232" }}
              floatingLabelStyle={{color:'#86C232'}}
              inputStyle={{color: 'white'}}
                type="text"
                value={this.state.country}
                onChange={e => this.handleTextChange(e)}
                name="country"
                hintText="Country"
                floatingLabelText="Country"
                fullWidth={true}
              /><br/>

              <TextField
              underlineFocusStyle={{borderColor: "#86C232" }}
              floatingLabelStyle={{color:'#86C232'}}
              inputStyle={{color: 'white'}}
                type="text"
                value={this.state.website}
                onChange={e => this.handleTextChange(e)}
                name="website"
                hintText="Website"
                floatingLabelText="Website"
                fullWidth={true}
              /><br/>

              <TextField
              underlineFocusStyle={{borderColor: "#86C232" }}
              floatingLabelStyle={{color:'#86C232'}}
              inputStyle={{color: 'white'}}
                type="text"
                value={this.state.phone}
                onChange={e => this.handleTextChange(e)}
                name="phone"
                hintText="Phone"
                floatingLabelText="Phone"
                fullWidth={true}
              /><br/>

              <TextField
              underlineFocusStyle={{borderColor: "#86C232" }}
              floatingLabelStyle={{color:'#86C232'}}
              inputStyle={{color: 'white'}}
                type="email"
                value={this.state.email}
                onChange={e => this.handleTextChange(e)}
                name="email"
                hintText="Email"
                floatingLabelText="Email"
                fullWidth={true}
              />

              <div className='add-clients-form-button'>
              
                <RaisedButton
                style={{backgroundColor : '#86C232'}}
                  label="CANCEL"
                  backgroundColor={buttonStyle1.backgroundColor}
                  labelColor={buttonStyle1.labelColor}  
                  onClick={() => this.handleCancelModalClick()}
                />
                <RaisedButton
                style={{backgroundColor : '#86C232'}}
                disabledBackgroundColor='#86C232'
                  backgroundColor={buttonStyle2.backgroundColor}
                  labelColor={buttonStyle2.labelColor}
                  onClick={() => this.handleAddClient()}
                  label="CONFIRM"
                  disabled={this.state.disable}
                />
              </div>
            
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
  getAllClients,
  updateClientName,
  updateAddressOne,
  updateAddressTwo,
  updateCity,
  updateState,
  updateZip,
  updatePhone,
  updateWebsite,
  getLocation
})(ClientForm);
