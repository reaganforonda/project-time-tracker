import React from 'react';
import PropTypes from 'prop-types';
import Menu from '../Menu/Menu';


export default class JobView extends React.Component{
    render(){
        return(
            <div>
                <div className='menu'>
                    <Menu/>
                </div>
            
                
                <div className='job-container'>
                    <div className='clockedIn'>
                        <h1>On The Clock</h1>
                    </div>

                    <div className='clockedOut'>
                        <h1>Off The Clock</h1>
                    </div>
                </div>

            </div>
        )
    }
}

