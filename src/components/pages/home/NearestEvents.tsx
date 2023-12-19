import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import EventCard from "../../eventCard/EventCard";
import "./HomePage.css";
import { postData } from "../../../utils/fetchData";

const NearestEvents = () => {
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
        setCardEvents(slicedEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Box>
      <Typography component="h1" variant="h4">
        {t("homeContent.nearest")}
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
          />
        ))}
      </Box>
    </Box>
  );
};

export default NearestEvents;
