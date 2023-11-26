import React from "react";
import MapComponent from "./MapComponent";
import { coordinates } from "../../../constants/coordinates";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const MapPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate("/add_event");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 5 }}>
      <MapComponent events={coordinates} />
      <Box sx={{ width: "20%" }}>
        <IconButton
          sx={{
            width: "100%",
            backgroundColor: "primary.main",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
            mb: 2,
          }}
          onClick={handleAddButtonClick}
        >
          <AddIcon />
          {t("map.add_event")}
        </IconButton>
        <Typography variant="h6"> {t("map.filters")}</Typography>
      </Box>
    </Box>
  );
};

export default MapPage;
