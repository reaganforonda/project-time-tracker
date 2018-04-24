import React from "react";
import ReactDOM from "react-dom";
import "./Main.css";
import App from "./App";
// import registerServiceWorker from "./registerServiceWorker";
import {unregister } from './registerServiceWorker';
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import store from "./store";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>

<MuiThemeProvider>
      <App />
      </MuiThemeProvider>

    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
// registerServiceWorker();
unregister();
