import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import EventCard from "../../eventCard/EventCard";
import { coordinates as events } from "../../../constants/coordinates";
import "./HomePage.css";
import { postData } from "../../../utils/fetchData";

import DefaultImage from "../../../assets/event.jpg";

const Home = () => {
  const { t } = useTranslation();

  const [cardEvents, setCardEvents] = useState<EventCard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const events = await postData("events/search", {
          latitude: 52.2297,
          longitude: 21.0122,
          radius: 10000000,
        });
        const slicedEvents = events.slice(0, 8);
        console.log(slicedEvents);
        setCardEvents(slicedEvents);
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
      <Typography component="h1" variant="h5">
        {t("homeContent.find")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 5,
        }}
      >
        {cardEvents.map((event, index) => (
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
                ? ` data:image/png;base64,${event.eventImages[0].image}`
                : DefaultImage
            }
          />
        ))}
      </Box>
    </Container>
  );
};

export default Home;
