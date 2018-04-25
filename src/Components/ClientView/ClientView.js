import React from "react";

import ClientForm from '../ClientForm/ClientForm';


export default class ClientView extends React.Component {
  render() {
    return (
      <div className='clientview-container'>
          <div className='floating-action'>
            <ClientForm/>
          </div>
      </div>
    );
  }
}
