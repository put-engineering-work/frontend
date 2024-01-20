import { Box } from "@mui/material";
import React from "react";
import MapCard from "./MapCard";

interface MapComponentProps {
  events: EventCard[];
}

const MapCards: React.FC<MapComponentProps> = ({ events }) => {
  return (
    <Box>
      {events.map((event) => (
        <MapCard event={event} />
      ))}
    </Box>
  );
};

export default MapCards;
