import React from 'react';
import {Switch, Route} from 'react-router-dom';

import landing from './Components/Landing/Landing';
import dashboard from './Components/Dashboard/Dashboard';

export default function Routing(props){
    return (
        <Switch>
            <Route exact path='/' Component={landing}/>
            <Route path='/dashboard' Component={dashboard}/>
        </Switch>
    )
}