import { Box, Typography } from "@mui/material";
import { InfoWindow } from "@react-google-maps/api";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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

const InfoWindowComponent: React.FC<{
  position: google.maps.LatLngLiteral;
  events: Event[];
  toggleClose: any;
  openInfoWindowId: any;
}> = ({ position, events, toggleClose, openInfoWindowId }) => {
  const { t } = useTranslation();

  const event = events.find((event: Event) => event.id === openInfoWindowId);

  if (!event) {
    return null;
  }

  return (
    <InfoWindow
      onCloseClick={toggleClose}
      position={position}
      options={{ maxWidth: 150 }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ fontSize: 13, fontWeight: "bold", color: "black" }}>
          {event.name}
        </Typography>
        <Typography sx={{ fontSize: 12, color: "black" }}>
          {event.address}
        </Typography>
        <Link to={`/events/${event.id}`}>{t("map.view_details")}</Link>
      </Box>
    </InfoWindow>
  );
};

export default InfoWindowComponent;
