import React, { Component } from 'react';
import Routing from './routing';
import {withRouter} from 'react-router-dom';

import Landing from './Components/Landing/Landing';

class App extends Component {
  render() {

    console.log(this.props.location.pathname);
    return (
      <div className="App">
      {
        
        this.props.location.pathname !== '/' ? null : <Landing/>
      }
        <Routing/>
      </div>
    );
  }
}

export default withRouter(App);
