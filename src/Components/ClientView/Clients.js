import React from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
  RaisedButton
} from "material-ui";

export default class Clients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
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
            <RaisedButton label="DELETE" />
            <RaisedButton label="EDIT" />
          </CardText>
        </Card>
      </div>
    );
  }
}
