import React from 'react';
import Menu from "../Menu/Menu";

import EntryForm from '../EntryForm/EntryForm';
export default class EntryView extends React.Component{
    render(){
        return (
            <div className='entryview-container'>


            <div className='floating-action'>
            <EntryForm/>
            
            </div>
        
            </div>
        )
    }
}