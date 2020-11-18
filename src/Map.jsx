import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import './Map.css';
import { showDataOnMap } from "./util";

function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

function Map({center, zoom, data, casesType}) {
    return (
        <div className="map">
            {console.log(data)}
            <MapContainer center={center} zoom={zoom} >
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <ChangeView  center={center} zoom={zoom}/>
            {showDataOnMap(data, casesType)}
        
      </MapContainer>
            
        </div>
    );
}

export default Map;
