import React, { useEffect, useState } from "react";
import MapComponent from "./MapComponent";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { postData } from "../../../utils/fetchData";
import MapFilters from "./MapFilters";
import { defaultFilters } from "./MapFilters/defaultFilters";

const MapPage: React.FC = () => {
  const [filters, setFilters] = useState<EventFilters>(defaultFilters);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const handleAddButtonClick = () => {
    navigate("/add_event");
  };

  const fetchData = async () => {
    try {
      const eve = await postData("events/search", filters);

      console.log(eve);
      setEvents(eve);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column" },
          gap: 5,
          mx: 5,
        }}
      >
        <Box sx={{ width: "100%" }}>
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
          <Typography variant="h6" mb={2}>
            {" "}
            {t("map.filters")}
          </Typography>
          <MapFilters
            filters={filters}
            setFilters={setFilters}
            fetchData={fetchData}
          />
        </Box>
        <MapComponent events={events} filters={filters} />
      </Box>
    </Box>
  );
};

export default MapPage;
