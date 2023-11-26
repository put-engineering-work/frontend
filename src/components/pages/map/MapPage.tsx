import React from "react";
import MapComponent from "./MapComponent";
import { coordinates } from "../../../constants/coordinates";

const MapPage: React.FC = () => {
  return (
    <div>
      <MapComponent events={coordinates} />
    </div>
  );
};

export default MapPage;
