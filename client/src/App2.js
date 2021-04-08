import React, { Component } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from './component/icon'
import Card from './component/card'


function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

class App extends Component {
  constructor(props) {

    super(props);
    this.state = {
      userMessage: {
        name: '',
        message: '',
      },
      location: {
        lat: '',
        lng: ''
      },
      haveUsersLocation: false,
      zoom: 2,
    }
  }
  handleCallBack = (childData) => {
    const name = childData.name
    const message = childData.message
    this.setState((prevState) => ({
      userMessage: {
        ...prevState,
        name,
        message,
      }

    }))

    // Loggings
    console.log(this.state.userMessage)

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
      <>
        <MapContainer worldCopyJump={true} center={position} zoom={zoom} style={{ height: '350px' }}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors and Chat location by Iconika from the Noun Project"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
        <Card props={this.state.haveUsersLocation} parentCallBack={this.handleCallBack} />

      </>
    )
  }
}

export default App;