import React from "react";
import Menu from "../Menu/Menu";

export default class ClientView extends React.Component {
  render() {
    return (
      <div>
        <div className="menu">
          <Menu />
        </div>
        Client View
      </div>
    );
  }
}
