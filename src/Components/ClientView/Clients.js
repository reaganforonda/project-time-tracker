import React from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import Toggle from "material-ui/Toggle";

export default class Clients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  handleExpandChange() {
    this.setState({ expanded: true });
  }

  render() {
    return (
      <div>
        <Card expanded={this.state.expanded}>
          <CardHeader
            title={this.props.name}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText>
              <p>{this.props.addressOne}</p>
              <p>{this.props.addressTwo}</p>
              <div>
                  
              </div>
              

          </CardText>
        </Card>
      </div>
    );
  }
}
