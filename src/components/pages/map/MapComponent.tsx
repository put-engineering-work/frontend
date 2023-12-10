import React, { useEffect, useRef, useState } from "react";
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
    width: "100%",
    height: "600px",
  };

  const [openInfoWindowId, setOpenInfoWindowId] = useState<string | null>(null);
  const [infoWindowPosition, setInfoWindowPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral | null>({
    lat: 52.409538,
    lng: 16.9191063,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  const toggleOpen = (eventId: string, position: google.maps.LatLngLiteral) => {
    setOpenInfoWindowId(eventId);
    setInfoWindowPosition(position);
    setMapCenter(position);
  };

  const toggleClose = () => {
    setOpenInfoWindowId(null);
  };

  useEffect(() => {
    // Перемещение карты при открытии информационного окна
    if (mapRef.current && mapCenter !== null) {
      mapRef.current.panTo(mapCenter);
      // mapRef.current.setZoom(15); // Установите желаемый уровень зума
    }
  }, [mapCenter]);

  return (
    <LoadScriptNext googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={
          mapCenter || // Если установлен центр карты, используем его
          (events[0]?.latitude && events[0]?.longitude
            ? { lat: events[0].latitude, lng: events[0].longitude }
            : { lat: 52.409538, lng: 16.9191063 })
        }
        zoom={13}
        options={{
          ...mapOptions,
          streetViewControl: false,
        }}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        {events.map((event) => (
          <Marker
            key={event.id}
            position={{ lat: event.latitude, lng: event.longitude }}
            title={event.name}
            onClick={() =>
              toggleOpen(event.id, {
                lat: event.latitude,
                lng: event.longitude,
              })
            }
          />
        ))}

        {openInfoWindowId !== null && infoWindowPosition !== null && (
          <InfoWindowComponent
            position={infoWindowPosition}
            events={events}
            toggleClose={toggleClose}
            openInfoWindowId={openInfoWindowId}
          />
        )}
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default MapComponent;
