import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getDataJson } from "../../../utils/fetchData";
import { Box, Button, Container, Typography } from "@mui/material";
import EventCard from "../../eventCard/EventCard";
import { useNavigate } from "react-router-dom";

import DefaultImage from "../../../assets/event.jpg";

const MyEvents = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [cardEvents, setCardEvents] = useState<EventCard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const events = await getDataJson("events/history");
        setCardEvents(events);
        console.log(events);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container
      component="main"
      sx={{ maxWidth: "unset!important", padding: "10px!important" }}
    >
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        {t("my_event.title")}:
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 5,
        }}
      >
        {!cardEvents ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography sx={{ my: 2 }}>{t("my_event.no_register")}!</Typography>
            <Button
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                padding: "8px 35px",
                fontSize: 15,
                color: "white",
              }}
              variant="contained"
              onClick={() => navigate("../login")}
            >
              {t("my_event.login")}
            </Button>
          </Box>
        ) : cardEvents.length > 0 ? (
          cardEvents.map((event, index) => (
            <EventCard
              key={index}
              name={event.name}
              startDate={event.startDate}
              description={event.description}
              category={""}
              id={event.id}
              endDate={event.endDate}
              address={event.address}
              latitude={event.latitude}
              longitude={event.longitude}
              link={event.id}
              photo={
                event.eventImages && event.eventImages.length > 0
                  ? event.eventImages[0]
                  : DefaultImage
              }
            />
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography sx={{ my: 2 }}> {t("my_event.no_events")}!</Typography>
            <Button
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                padding: "8px 35px",
                fontSize: 15,
                color: "white",
              }}
              variant="contained"
              onClick={() => navigate("../map")}
            >
              {t("my_event.find_event")}
            </Button>
          </Box>
        )}
        {}
      </Box>
    </Container>
  );
};

export default MyEvents;
