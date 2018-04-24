import React from 'react';
import Menu from '../Menu/Menu';
import Routing from "../../routing";

export default class Dashboard extends React.Component{
    constructor(props){
        super(props);

        this.state = {}
    }

    render(){
        return (
            <div className='Dashboard'>
                <Menu/>
            </div>
        )
    }
}