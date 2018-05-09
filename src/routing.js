import React from "react";
import { Switch, Route } from "react-router-dom";

import landing from "./Components/Landing/Landing";
import dashboard from "./Components/Dashboard/Dashboard";
import InvoiceView from './Components/InvoiceView/InvoiceView' 

export default function Routing(props) {
  return (
    <Switch>
      <Route exact path="/" component={landing} />
      <Route path="/dashboard" component={dashboard}/>
      <Route path='/invoiceview' component={InvoiceView}/>
    </Switch>
  );
}


