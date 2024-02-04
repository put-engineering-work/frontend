import React, { useEffect, useRef, useState } from "react";
import MapComponent from "./MapComponent";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getDataInQuery, postData } from "../../../utils/fetchData";
import MapFilters from "./MapFilters";
import { defaultFilters } from "./MapFilters/defaultFilters";
import MapCards from "./MapCards";

const MapPage = ({ isLogged }: { isLogged: boolean }) => {
  const itemsPerPage = 10;
  const [page, setPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(0);

  const [eventsForCards, setEventsForCards] = useState<any>([]);

  const mapRef = useRef<any | null>(null);

  const [filters, setFilters] = useState<EventFilters>(defaultFilters);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [eventsForMap, setEventsForMap] = useState([]);

  const handleAddButtonClick = () => {
    navigate("/add_event");
  };

  const fetchData = async () => {
    try {
      const eventsForMap = await postData("events/search", filters);
      setEventsForMap(eventsForMap);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getEventsForCards = async (newPage: number) => {
    const events = await postData(
      `events/pageable/${itemsPerPage}/${newPage}`,
      filters
    );

    setEventsForCards(events);
  };

  const getNumberOfPages = async () => {
    const pages = await postData(`events/number/10`, filters);
    setNumberOfPages(pages.number);
  };

  useEffect(() => {
    fetchData();
    getEventsForCards(page);
    getNumberOfPages();
  }, []);

  return (
    <Box sx={{ width: "100%", mb: 10 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column" },
          gap: 5,
          mx: 5,
        }}
      >
        <Box sx={{ width: "100%" }}>
          {isLogged && (
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
          )}

          <Typography variant="h6" mb={2}>
            {" "}
            {t("map.filters")}
          </Typography>
          <MapFilters
            fetchData={fetchData}
            filters={filters}
            setFilters={setFilters}
            getEventsForCards={getEventsForCards}
            getNumberOfPages={getNumberOfPages}
            mapRef={mapRef}
          />
        </Box>
        <MapComponent events={eventsForMap} filters={filters} mapRef={mapRef} />
        <MapCards
          numberOfPages={numberOfPages}
          eventsForCards={eventsForCards}
          getEventsForCards={getEventsForCards}
          page={page}
          setPage={setPage}
        />
      </Box>
    </Box>
  );
};

export default MapPage;
