import React from "react";
import ReactDOM from "react-dom";
import "./Main.css";
import App from "./App";
// import registerServiceWorker from "./registerServiceWorker";
import { unregister } from "./registerServiceWorker";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import store from "./store";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  datePicker : {
    headerColor : "#222629",
    selectColor : "#222629",
    selectTextColor : "#86C232",
    textColor : "#86C232",
    color : "#86C232",

  },

  timePicker: {
    textColor : "#86C232",
    headerColor : "#222629",
    clockColor : 'white',
    clockCircleColor : "#6B6E70",
    accentColor : '#86C232',
    selectColor : "#222629",
    selectTextColor : 'white'
  }
})

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <MuiThemeProvider muiTheme={muiTheme}>
        <App />
      </MuiThemeProvider>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
// registerServiceWorker();
unregister();
