// import React from 'react';
// import ReactDOM from 'react-dom'

// export default class Map extends React.Component {

//     componentDidUpdate(prevProps, prevState){
//         if(prevProps.google !== this.props.google){
//             this.loadMap()
//         }
//     }

//     loadMap(){
//         if(this.props && this.props.google) {
//             const {google} = this.props;
//             const maps = google.maps;

//             const mapRef = this.refs.map;
//             const node = ReactDOM.findDOMNode(mapRef);

//             let zoom = 14;
//             let lat = this.props.lan;
//             let lng = this.props.long;

//             const center = new maps.LatLng(lat, lng);
//             const mapConfig = Object.assign({}, {
//                 center : center,
//                 zoom: zoom
//             })
//             this.map = new maps.Map(node, mapConfig);
//         }
//     }



//     render() {
//         return (
//             <div className='map-con' ref='map'>
//                 Loading Map...
//             </div>
//         )
//     }
// } TODO: REMOVE