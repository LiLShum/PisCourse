import React, { useRef, useEffect, useState } from 'react';
import { MapContainer } from 'react-leaflet'
import { TileLayer } from 'react-leaflet'
import { Marker } from 'react-leaflet'
import { Popup } from 'react-leaflet'
const Map = () => {
    return (
        <MapContainer style={{width: '100%', height: "25vw"}} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>

    )
}

export default Map;