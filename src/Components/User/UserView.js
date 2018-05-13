import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Avatar, Paper, RaisedButton, TextField } from "material-ui";

import {
  updateFirstName,
  updateUserInfo,
  updateLastName,
  updateAddressOne,
  updateAddressTwo,
  updateEmail,
  updatePhone,
  updatePicture,
  updateCity,
  updateWebsite,
  updateState,
  updateZip,
  updateCountry,
  getUser
} from "../../ducks/userReducer";

export class UserView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      disable: true,
      first_name: this.props.user.first_name,
      last_name: this.props.user.last_name,
      email: this.props.user.email,
      phone: this.props.user.phone,
      website: this.props.user.website,
      zip: this.props.user.zip,
      country: this.props.user.country,
      city: this.props.user.city,
      state: this.props.user.state,
      address_one: this.props.user.address_one,
      address_two: this.props.user.address_two,
      buttonMargin : '41%'
      
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.switchToEditMode = this.switchToEditMode.bind(this);
    this.handleUpdateInfo = this.handleUpdateInfo.bind(this);
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  switchToEditMode() {
    
    this.setState({ edit: true, disable: false, buttonMargin: '31%' });
    
    
  }

  handleUpdateInfo() {
    this.props.updateFirstName(this.state.first_name);
    this.props.updateLastName(this.state.last_name);

    this.props.updateEmail(this.state.email);
    this.props.updatePhone(this.state.phone);
    this.props.updateAddressOne(this.state.address_one);
    this.props.updateAddressTwo(this.state.address_two);
    this.props.updateCity(this.state.city);
    this.props.updateState(this.state.state);
    this.props.updateCountry(this.state.country);
    this.props.updateWebsite(this.state.website);
    this.props.updateZip(this.state.zip);
    let user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      phone: this.state.phone,
      address_one: this.state.address_one,
      address_two: this.state.address_two,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      website: this.state.website,
      zip: this.state.zip
    };

    this.props.updateUserInfo(this.props.user.user_id, user);
    this.setState({ edit: false, disable: true, butMargin:'41%' });
  }

  render() {

    const buttonStyle1 = {
      labelColor : "white",
      backgroundColor: "#86C232"
    };
    return (
      <div className='user-view'>
        <div>
          <Paper className='user-view-paper' style={{backgroundColor : '#6B6E70'}}zDepth={2}>
          <div style={{width:'50%', display:'flex', justifyContent:'center', alignItems:'center'}}><Avatar className='profile-picture-user-view' src={this.props.user.picture} size={400} /></div>
          <div style ={{width:'50%'}}>
            <TextField
            style={{marginRight : '5%', width:'47%'  }}
            inputStyle={{color: 'white'}}
            floatingLabelStyle={{color:'#86C232'}}
             underlineFocusStyle={{borderColor: "#86C232" }}
              value={this.state.first_name}
              onChange={e => this.handleInputChange(e)}
              disabled={this.state.disable}
              name="first_name"
              floatingLabelText="First Name"
            />
            <TextField
            style={{width:'47%'  }}
            inputStyle={{color: 'white'}}
            floatingLabelStyle={{color:'#86C232'}}
             underlineFocusStyle={{borderColor: "#86C232" }}
              value={this.state.last_name}
              onChange={e => this.handleInputChange(e)}
              disabled={this.state.disable}
              name="last_name"
              floatingLabelText="Last Name"
            />
            <TextField
            style={{marginRight : '5%', width:'47%'  }}
            inputStyle={{color: 'white'}}
            floatingLabelStyle={{color:'#86C232'}}
             underlineFocusStyle={{borderColor: "#86C232" }}
              value={this.state.email}
              onChange={e => this.handleInputChange(e)}
              disabled={this.state.disable}
              name="email"
              floatingLabelText="Email"
            />
            <TextField
            style={{width:'47%'  }}
            inputStyle={{color: 'white'}}
            floatingLabelStyle={{color:'#86C232'}}
             underlineFocusStyle={{borderColor: "#86C232" }}
              value={this.state.phone}
              onChange={e => this.handleInputChange(e)}
              disabled={this.state.disable}
              name="phone"
              floatingLabelText="Phone"
            />
            <TextField
            style={{marginRight : '5%', width:'47%'  }}
            inputStyle={{color: 'white'}}
            floatingLabelStyle={{color:'#86C232'}}
             underlineFocusStyle={{borderColor: "#86C232" }}
              value={this.state.address_one}
              onChange={e => this.handleInputChange(e)}
              disabled={this.state.disable}
              name="address_one"
              floatingLabelText="Address"
            />
            <TextField
            style={{width:'47%'  }}
            inputStyle={{color: 'white'}}
            floatingLabelStyle={{color:'#86C232'}}
             underlineFocusStyle={{borderColor: "#86C232" }}
              value={this.state.address_two}
              onChange={e => this.handleInputChange(e)}
              disabled={this.state.disable}
              name="address_two"
              floatingLabelText="Address Cont."
            />
            <TextField
            style={{marginRight : '5%', width:'47%'  }}
            inputStyle={{color: 'white'}}
            floatingLabelStyle={{color:'#86C232'}}
             underlineFocusStyle={{borderColor: "#86C232" }}
              value={this.state.city}
              onChange={e => this.handleInputChange(e)}
              disabled={this.state.disable}
              name="city"
              floatingLabelText="City"
            />
            <TextField
            style={{width:'47%'  }}
            inputStyle={{color: 'white'}}
            floatingLabelStyle={{color:'#86C232'}}
             underlineFocusStyle={{borderColor: "#86C232" }}
              value={this.state.state}
              onChange={e => this.handleInputChange(e)}
              disabled={this.state.disable}
              name="state"
              floatingLabelText="State"
            />
            <TextField
            style={{marginRight : '5%', width:'47%'  }}
            inputStyle={{color: 'white'}}
            floatingLabelStyle={{color:'#86C232'}}
             underlineFocusStyle={{borderColor: "#86C232" }}
              value={this.state.zip}
              onChange={e => this.handleInputChange(e)}
              disabled={this.state.disable}
              name="zip"
              floatingLabelText="Zip"
            />
            <TextField
            style={{width:'47%'  }}
            inputStyle={{color: 'white'}}
            floatingLabelStyle={{color:'#86C232'}}
             underlineFocusStyle={{borderColor: "#86C232" }}
              value={this.state.country}
              onChange={e => this.handleInputChange(e)}
              disabled={this.state.disable}
              name="country"
              floatingLabelText="Country"
            />
            <div style={{display: 'inline-block', width: '100%'}}>
            <TextField
            style={{width:'47%'}}
            inputStyle={{color: 'white'}}
            floatingLabelStyle={{color:'#86C232'}}
             underlineFocusStyle={{borderColor: "#86C232" }}
              value={this.state.website}
              onChange={e => this.handleInputChange(e)}
              disabled={this.state.disable}
              name="website"
              floatingLabelText="Website"
            />
            <div style={{marginLeft : `${this.state.buttonMargin}`}}className='userview-button'>
              <Link to="/dashboard">
                {this.state.edit ? <RaisedButton labelColor={buttonStyle1.labelColor} backgroundColor={buttonStyle1.backgroundColor} label="Cancel" /> : null}
              </Link>
              {this.state.edit ? (
                <RaisedButton
                backgroundColor={buttonStyle1.backgroundColor}
                labelColor={buttonStyle1.labelColor}
                  onClick={() => this.handleUpdateInfo()}
                  label="Save"
                />
              ) : (
                <RaisedButton
                backgroundColor={buttonStyle1.backgroundColor}
                labelColor={buttonStyle1.labelColor}
                  onClick={() => this.switchToEditMode()}
                  label="Edit"
                />
              )}
            </div>
            </div>
            </div>
          </Paper>
        </div>
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
  getUser,
  updateFirstName,
  updateUserInfo,
  updateLastName,
  updateEmail,
  updatePhone,
  updatePicture,
  updateAddressOne,
  updateAddressTwo,
  updateCity,
  updateState,
  updateWebsite,
  updateZip,
  updateCountry
})(UserView);
