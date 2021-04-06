import './App.css';
import { Map, TileLayer, Marker, Popup, MapContainer } from 'react-leaflet'

function App() {
  const position = [51.505, -0.09]
  return (
    <div className="App">
      <MapContainer center={[51.505, -0.09]} className="map" zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
