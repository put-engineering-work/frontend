import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getDataJson } from "../../../utils/fetchData";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import DefaultImage from "../../../assets/event.jpg";
import EventCard from "../../cards/EventCard";

const MyEvents = ({ isLogged }: { isLogged: boolean }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);

  const [cardEvents, setCardEvents] = useState<EventCard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const events = await getDataJson("events/history");
        setCardEvents(events);
        console.log(events);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setLoading(false);
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
          justifyContent:
            cardEvents && cardEvents.length > 0 ? "flex-start" : "center",
          gap: 5,
          mb: 5,
        }}
      >
        {!loading ? (
          !isLogged ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <Typography sx={{ my: 2 }}>
                {t("my_event.no_register")}!
              </Typography>
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
          ) : cardEvents && cardEvents.length > 0 ? (
            cardEvents.map((event, index) => (
              <EventCard
                key={index}
                name={event.name}
                startDate={event.startDate}
                description={event.description}
                categories={event.categories}
                id={event.id}
                endDate={event.endDate}
                address={event.address}
                latitude={event.latitude}
                longitude={event.longitude}
                link={event.id}
                numberOfMembers={event.numberOfMembers}
                host={event.host}
                photo={
                  event.eventImages && event.eventImages.length > 0
                    ? ` data:image/png;base64,${event.eventImages[0].image}`
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
              <Typography sx={{ my: 2 }}>
                {" "}
                {t("my_event.no_events")}!
              </Typography>
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
          )
        ) : (
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
        )}
      </Box>
    </Container>
  );
};

export default MyEvents;
