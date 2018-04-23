import React from 'react';

import Menu from '../Menu/Menu';

export default class Dashboard extends React.Component{
    constructor(props){
        super(props);

        this.state = {}
    }

    render(){
        return (
            <div className='Dashboard'>
            DASHBOARD COMPONENT
                <div>
                    <Menu/>
                </div>
                
            </div>
        )
    }
}