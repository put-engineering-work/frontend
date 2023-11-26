import React, { useEffect } from "react";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";

interface Event {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface MapComponentProps {
  events: Event[];
}

const MapComponent: React.FC<MapComponentProps> = ({ events }) => {
  const mapContainerStyle = {
    width: "75%",
    height: "600px",
  };

  return (
    <LoadScriptNext googleMapsApiKey="AIzaSyBdSUQXo7J7AQGX5mHFiayXBTwAvHo02B8">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={
          events[0]?.latitude && events[0]?.longitude
            ? { lat: events[0].latitude, lng: events[0].longitude }
            : { lat: 52.409538, lng: 16.931992 }
        }
        zoom={15}
      >
        {events.map((event) => (
          <Marker
            key={event.id}
            position={{ lat: event.latitude, lng: event.longitude }}
            title={event.name}
          />
        ))}
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default MapComponent;
