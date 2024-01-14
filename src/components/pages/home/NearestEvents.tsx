import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import EventCard from "../../cards/EventCard";
import "./HomePage.css";
import { postData } from "../../../utils/fetchData";
import { useNavigate } from "react-router-dom";
import DefaultImage from "../../../assets/event.jpg";

const NearestEvents = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [cardEvents, setCardEvents] = useState<EventCard[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const events = await postData("events/search", {
          latitude: 52.2297,
          longitude: 21.0122,
          radius: 10000000,
        });
        console.log(events);
        const slicedEvents = events.slice(0, 8);
        setCardEvents(slicedEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);
  return (
    <Box>
      <Typography component="h1" variant="h4">
        {t("homeContent.nearest")}
      </Typography>

      {loading ? (
        <div
          style={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="primary" />
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 3,
            rowGap: 5,
            marginBlock: 5,
            alignItems: "flex-start",
            "@media (max-width: 768px)": {
              justifyContent: "center",
            },
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
      )}
      <Box
        sx={{
          textAlign: "center",
          marginTop: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/map");
          }}
          className="see-more-btn"
          sx={{
            color: "text.primary",
          }}
        >
          {t("homeContent.seeMore")}
        </Button>
      </Box>
    </Box>
  );
};

export default NearestEvents;
