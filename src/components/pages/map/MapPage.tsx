import React, { useEffect, useState } from "react";
import MapComponent from "./MapComponent";
import { coordinates } from "../../../constants/coordinates";
import { Box, Container, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { postData } from "../../../utils/fetchData";

const MapPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [events, setEvents] = useState();

  const handleAddButtonClick = () => {
    navigate("/add_event");
  };

  useEffect(() => {
    const eve = postData("events/search", {
      latitude: 52.2297,
      longitude: 21.0122,
      radius: 1000000,
    });
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 5,
          mx: 5,
        }}
      >
        <MapComponent events={coordinates} />
        <Box sx={{ width: { xs: "100%", md: "30%" } }}>
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
    </Box>
  );
};

export default MapPage;
