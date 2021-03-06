import React from "react";
import {
  Card,
  CardHeader,
  CardText,
  RaisedButton,
  Dialog,
  TextField,
  Snackbar,
  FlatButton,
  Checkbox
} from "material-ui";
import { getAllClients } from "../../ducks/clientReducer";
import { connect } from "react-redux";
import axios from "axios";
import MapContainer from '../Maps/MapContainer'

export class Clients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      edit: false,
      client_name: this.props.client.client_name,
      address_one: this.props.client.address_one,
      address_two: this.props.client.address_two,
      city: this.props.client.city,
      state: this.props.client.state,
      country: this.props.client.country,
      phone: this.props.client.phone,
      website: this.props.client.website,
      zip: this.props.client.zip,
      active: this.props.client.active,
      checked: !this.props.client.active,
      email: this.props.client.email,
      snackbar: false
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleOpenEdit = this.handleOpenEdit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleUpdateClient = this.handleUpdateClient.bind(this);
    this.handleRequestCloseSnackbar = this.handleRequestCloseSnackbar.bind(this);
  }

  handleCheckBox() {
    let oldState = this.state.checked;
    this.setState({ checked: !oldState });
    this.setState({ active: oldState });
  }

  handleCancel() {
    this.setState({ openModal: false });
  }

  handleOpenEdit() {
    this.setState({ edit: true, openModal: true });
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleUpdateClient() {
    let loc = {
      address : this.state.address_one,
      city : this.state.city,
      state : this.state.state
    }

    axios.post(`/api/google/geocoding`, loc).then((result) => {
      let lan = result.data.lat;
      let long = result.data.lng;
      let client = {
        client_name: this.state.client_name,
        address_one: this.state.address_one,
        address_two: this.state.address_two,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country,
        phone: this.state.phone,
        website: this.state.website,
        zip: this.state.zip,
        active: this.state.active,
        email: this.state.email,
        lan : lan,
        long : long
      };

      

    axios
      .put(
        `/api/client/update/${this.props.client.user_id}/${
          this.props.clientId
        }`,
        client
      )
      .then(result => {
        console.log(result.data);
        this.props.getAllClients(this.props.client.user_id);
        this.setState({snackbar:true})
      })
      .catch(e => {
        console.log(e);
      });

    this.setState({ openModal: false });
  })}


  handleRequestCloseSnackbar(){
    this.setState({snackbar: false})
  }

  render() {
    const style = {
      cardStyle: {
        backgroundColor: "#6B6E70",
        width: '80%',
        marginRight:'auto',
        marginLeft: 'auto',
      },

      titleHeader:{
        titleColor:"#86C232",
        style:{
          textAlign : 'center'
        },
        titleStyle:{
          textTransform:'uppercase',
          fontSize: '30px',
          textAlign : 'center'
        }
      },
      pText: {
        color: "white",
        fontSize:"16px"
      }
    };


    const styleButton = {
      color: "#86C232",
      backgroundColor: "#222629",
    };


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
      
        <Card style={style.cardStyle} className="card">
          <CardHeader style={style.titleHeader.style} title={this.props.name} titleColor={style.titleHeader.titleColor} titleStyle={style.titleHeader.titleStyle}/>
          <div className='card-mid-section'>
          <CardText style={style.pText}>
            <p>{this.props.addressOne} {this.props.addressTwo}</p>
            
            <p>
              {this.props.city}, {this.props.state} {this.props.zipcode}
            </p>
            <p>{this.props.client.country}</p>
            <p><a className='client-website-link' href={this.props.website} target='_blank'> {this.props.website}</a></p>
            <p>{this.props.phone}</p>
            <p>{this.props.email}</p>
          </CardText>
          
          
          <MapContainer client={this.props.client}/>
          
          
          </div><div className='client-edit-button-div'>
            <FlatButton style={styleButton} onClick={() => this.handleOpenEdit()} label="EDIT" /></div>
            <Dialog autoScrollBodyContent={true} modal={true} open={this.state.openModal} contentStyle={{ width: "fit-content" }} paperProps = {stylePaper} overlayStyle={overlayStyle}>
              <TextField
              floatingLabelStyle={{color:'#86C232'}}
              inputStyle={{color: 'white'}}
              underlineFocusStyle={{borderColor: "#86C232" }}
              fullWidth={true}
              value={this.state.client_name}
              onChange={e => this.handleInputChange(e)}
              name="client_name"
              hintText="Client Name"
              floatingLabelText="Client Name"
              />
              <TextField
              floatingLabelStyle={{color:'#86C232'}}
              inputStyle={{color: 'white'}}
              underlineFocusStyle={{borderColor: "#86C232" }}
              fullWidth={true}
                value={this.state.address_one}
                onChange={e => this.handleInputChange(e)}
                name="address_one"
                hintText="Address"
                floatingLabelText="Address"
              /><br/>
              <TextField
              floatingLabelStyle={{color:'#86C232'}}
              inputStyle={{color: 'white'}}
              underlineFocusStyle={{borderColor: "#86C232" }}
              fullWidth={true}
                value={this.state.address_two}
                onChange={e => this.handleInputChange(e)}
                name="address_two"
                hintText="Address Cont."
                floatingLabelText="Address Cont."
              /><br/>
              <TextField
              style={{width: '413px', marginRight: '20px'}}
              floatingLabelStyle={{color:'#86C232'}}
              inputStyle={{color: 'white'}}
              underlineFocusStyle={{borderColor: "#86C232" }}
              fullWidth={true}
                value={this.state.city}
                onChange={e => this.handleInputChange(e)}
                name="city"
                hintText="City"
                floatingLabelText="City"
              />
              <TextField
              style={{width: '100px', marginRight:'20px'}}
                floatingLabelStyle={{color:'#86C232'}}
                inputStyle={{color: 'white'}}
                underlineFocusStyle={{borderColor: "#86C232" }} 
                value={this.state.state}
                onChange={e => this.handleInputChange(e)}
                name="state"
                hintText="State"
                floatingLabelText="State"
              />
              <TextField
              style={{width : '166px'}}
              floatingLabelStyle={{color:'#86C232'}}
              inputStyle={{color: 'white'}}
              underlineFocusStyle={{borderColor: "#86C232" }}
                value={this.state.zip}
                onChange={e => this.handleInputChange(e)}
                name="zip"
                hintText="zip"
                floatingLabelText="Zip"
              />
              <TextField
              floatingLabelStyle={{color:'#86C232'}}
              inputStyle={{color: 'white'}}
              underlineFocusStyle={{borderColor: "#86C232" }}
              fullWidth={true}
                value={this.state.country}
                onChange={e => this.handleInputChange(e)}
                name="country"
                hintText="Country"
                floatingLabelText="Country"
              />
              <TextField
              floatingLabelStyle={{color:'#86C232'}}
              inputStyle={{color: 'white'}}
              underlineFocusStyle={{borderColor: "#86C232" }}
              fullWidth={true}
                value={this.state.phone}
                onChange={e => this.handleInputChange(e)}
                name="phone"
                hintText="Phone"
                floatingLabelText="Phone"
              />
              <TextField
              floatingLabelStyle={{color:'#86C232'}}
              inputStyle={{color: 'white'}}
              underlineFocusStyle={{borderColor: "#86C232" }}
              fullWidth={true}
                value={this.state.website}
                onChange={e => this.handleInputChange(e)}
                name="website"
                hintText="Website"
                floatingLabelText="Website"
              />

              <TextField
              floatingLabelStyle={{color:'#86C232'}}
              inputStyle={{color: 'white'}}
              underlineFocusStyle={{borderColor: "#86C232" }}
              fullWidth={true}
                value={this.state.email}
                onChange={e => this.handleInputChange(e)}
                name="email"
                hintText="Email"
                floatingLabelText="Email"
              />
              <Checkbox
                checked={this.state.checked}
                onCheck={this.handleCheckBox}
                label="Set as Inactive"
                labelStyle={{color: "#86C232"}}
                iconStyle={{fill : "#86C232"}}
              />

              <div className='clients-edit-buttons'>
              <RaisedButton
              backgroundColor={buttonStyle1.backgroundColor}
              labelColor={buttonStyle1.labelColor}
                onClick={() => this.handleCancel()}
                label="CANCEL"
              />
              <RaisedButton
              backgroundColor={buttonStyle1.backgroundColor}
              labelColor={buttonStyle1.labelColor}
                onClick={() => this.handleUpdateClient()}
                label="SAVE"
              />

              </div>
            </Dialog>
            <Snackbar
              open={this.state.snackbar}
              message="Client Saved"
              autoHideDuration={3000}
              onRequestClose={this.handleRequestCloseSnackbar}
              contentStyle={{color:'#86C232'}}
            />
            
        </Card>
      
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    clients: state.clientReducer.clients
  };
}

export default connect(mapStateToProps, { getAllClients })(Clients);
