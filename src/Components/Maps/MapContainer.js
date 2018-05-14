import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'



export class MapContainer extends React.Component{
    render(){
        const style = {
            width: '400px',
            height: '400px',
            
        }

        const pos = {lat : this.props.client.lan, lng:this.props.client.long}
        

        if(!this.props.loaded & !this.props.client) {
            
            return <div>Loading...</div>
        } else {
            return (
                <div className='google-map-container' style={style}>
                    <Map containerStyle={{position: 'relative'}} title={this.props.client.client_name} name={this.props.client.client_name}center={{lat: this.props.client.lan, lng:this.props.client.long}} style={style} google={this.props.google}>
                        
                        <Marker position={pos}/>
                    </Map>
                </div>
                
            )
        }
    }
}

export default GoogleApiWrapper({
    apiKey : process.env.GOOGLE_MAP_KEY
})(MapContainer)