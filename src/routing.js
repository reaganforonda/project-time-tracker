import React from 'react';
import {Switch, Route} from 'react-router-dom';

import landing from './Components/Landing/Landing';
import dashboard from './Components/Dashboard/Dashboard';
import JobView from './Components/JobView/JobView';

export default function Routing(props){
    return (
        <Switch>
            <Route exact path='/' component={landing}/>
            <Route path='/dashboard' component={dashboard}/>
            <Route path='/jobview' component={JobView}/>
        </Switch>
    )
}