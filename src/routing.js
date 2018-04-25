import React from "react";
import { Switch, Route } from "react-router-dom";

import landing from "./Components/Landing/Landing";
import dashboard from "./Components/Dashboard/Dashboard";
import JobView from "./Components/JobView/JobView";
import EntryView from "./Components/EntryView/EntryView";
import ClientsView from "./Components/ClientView/ClientView";
import BillingView from "./Components/BillingView/BillingView";

export default function Routing(props) {
  return (
    <Switch>
      <Route exact path="/" component={landing} />
      <Route path="/dashboard" component={dashboard}>
        {/* <Route path="/jobview" component={JobView} />
        <Route path="/entryview" component={EntryView} />
        <Route path="/clientsview" component={ClientsView} />
        <Route path="/billingview" component={BillingView} /> */}
      </Route>
    </Switch>
  );
}
