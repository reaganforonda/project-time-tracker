import React, { Component } from "react";
import Routing from "./routing";
import { withRouter } from "react-router-dom";

import Landing from "./Components/Landing/Landing";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routing />
      </div>
    );
  }
}

export default withRouter(App);
