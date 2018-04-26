import React from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
  RaisedButton,
  Dialog
} from "material-ui";

import axios from 'axios';

export default class Clients extends React.Component {
  constructor(props) {
    super(props);

   this.state = {
     openModal: false
   }
    
    this.handleDeleteClient = this.handleDeleteClient.bind(this);
  }


  // TODO: Change userID to actual user ID of user logged in
  handleDeleteClient(){
    
    axios.delete(`http://localhost:3005/api/client/${1}/${this.props.clientId}`).then((result) => {
      console.log(result.data);
    }).catch((e) => {
        console.log(e);
    })
  }

  render() {
    return (
      <div className="card-container">
        <Card className='card'>
          <CardHeader>
            <h1>{this.props.name}</h1>
          </CardHeader>
          <CardText>
            <p>{this.props.addressOne}</p>
            <p>{this.props.addressTwo}</p>
            <p>
              {this.props.city}, {this.props.state} {this.props.zipcode}
            </p>
            <p>{this.props.website}</p>
            <p>{this.props.phone}</p>
          </CardText>
          <CardText>
            <RaisedButton onClick={()=> this.handleDeleteClient()}  secondary={true} label="DELETE"/>
            <RaisedButton label="SET INACTIVE"/>
            <RaisedButton label="EDIT" />
          </CardText>
        </Card>
      </div>
    );
  }
}



