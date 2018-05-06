import React from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
  RaisedButton,
  Dialog,
} from "material-ui";
import {Link} from 'react-router-dom'

import axios from 'axios';

export default class Clients extends React.Component {
  constructor(props) {
    super(props);

   this.state = {
     openModal: false
   }
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
            <RaisedButton label="SET INACTIVE"/>
            <RaisedButton label="EDIT" />
          </CardText>
        </Card>
      </div>
    );
  }
}



