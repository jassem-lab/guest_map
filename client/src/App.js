import React, { Component } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from './component/icon'



function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

class App extends Component {

  state = {
    location: {
      lat: 51.505,
      lng: -0.09,
    },
    haveUsersLocation: false,
    zoom: 2,
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      /*  do_something(position.coords.latitude, position.coords.longitude) */
      this.setState({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        haveUsersLocation: true,
        zoom: 2
      })
    }, () => {
      console.log('uh oh .... they didnt give access !') // Verify function working when declining location request
      fetch('http://ip-api.com/json/')
        .then(res => res.json())
        .then(location => {
          console.log(location.lon);
          console.log(location.lat);
          this.setState({
            location: {
              lat: location.lat,
              lng: location.lon,
            },
            haveUsersLocation: true,
            zooom: 2
          })
        })
    });
  }


  render() {
    const position = [this.state.location.lat, this.state.location.lng]
    const zoom = this.state.zoom
    return (
      <MapContainer center={position} zoom={zoom} style={{ height: '350px' }}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />
        {this.state.haveUsersLocation ?
          <Marker
            className="icon"
            position={position}
            icon={Icon}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> : ''
        }
        <ChangeMapView coords={position} />

      </MapContainer>
    )
  }
}

export default App;