import React, { useEffect, useState, useRef, FC } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Map as LeafletMap, LatLngExpression } from 'leaflet';
const Map: FC<{ address: string }> = ({ address }) => {

    const [position, setPosition] = useState<LatLngExpression | null>(null);
    const mapRef = useRef<LeafletMap | null>(null);

    const geocodeAddress = async (address: string) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
            const data = await response.json();
            if (data.length > 0) {
                const { lat, lon } = data[0];
                const coords: LatLngExpression = [parseFloat(lat), parseFloat(lon)];
                setPosition(coords);
                if (mapRef.current) {
                    mapRef.current.setView(coords, 13);
                }
            } else {
                alert('Address not found!');
            }
        } catch (error) {
            console.error('Geocoding error:', error);
        }
    };

    useEffect(() => {
        geocodeAddress(address);
    }, [address]);

    return (
        <MapContainer
            style={{ width: '100%', height: '25vw', zIndex: 98 }}
            center={[51.505, -0.09]} // Initial center
            zoom={13}
            scrollWheelZoom={false}
            ref={(instance) => {
                if (instance) mapRef.current = instance;
            }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {position && Array.isArray(position) && (
                <Marker position={position}>
                    <Popup>Marker at {position[0]}, {position[1]}</Popup>
                </Marker>
            )}
        </MapContainer>
    );

};

export default Map;
