import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'



export class MapContainer extends React.Component{
    render(){
        const style = {
            width: '400px',
            height: '400px',
        }

        const pos = {lat : 37.759703, lng:-122.428093}

        if(!this.props.loaded) {
            return <div>Loading...</div>
        } else {
            return (
                <div className='google-map-container' style={style}>
                    <Map style={style} google={this.props.google}>
                        
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