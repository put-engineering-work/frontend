import React, { useState } from "react";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import { API_KEY } from "../../../constants/keys";
import { mapOptions } from "../../../constants/mapOptions";
import InfoWindowComponent from "./InfoWindowComponent";

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

  const [openInfoWindowId, setOpenInfoWindowId] = useState<string | null>(null);

  const toggleOpen = (eventId: string) => {
    setOpenInfoWindowId(eventId);
  };

  const toggleClose = () => {
    setOpenInfoWindowId(null);
  };

  return (
    <LoadScriptNext googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={
          events[0]?.latitude && events[0]?.longitude
            ? { lat: events[0].latitude, lng: events[0].longitude }
            : { lat: 52.409538, lng: 16.931992 }
        }
        zoom={15}
        options={mapOptions}
      >
        {events.map((event) => (
          <Marker
            key={event.id}
            position={{ lat: event.latitude, lng: event.longitude }}
            title={event.name}
            onClick={() => toggleOpen(event.id)}
          >
            {openInfoWindowId === event.id && (
              <InfoWindowComponent
                position={{ lat: event.latitude, lng: event.longitude }}
                events={events}
                toggleClose={toggleClose}
                openInfoWindowId={openInfoWindowId}
              />
            )}
          </Marker>
        ))}
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default MapComponent;
