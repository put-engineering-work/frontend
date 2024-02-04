import { Box, Pagination } from "@mui/material";
import React, { Dispatch, useEffect, useRef, useState } from "react";
import EventCard from "../../cards/EventCard";
import DefaultImage from "../../../assets/event.jpg";
import MapCard from "./MapCard";
import Loader from "../../spinner/Loader";

interface MapComponentProps {
  eventsForCards: any;
  page: number;
  setPage: Dispatch<React.SetStateAction<number>>;
  numberOfPages: number;
  getEventsForCards: (number: number) => Promise<void>;
  loading: boolean;
}

const MapCards: React.FC<MapComponentProps> = ({
  eventsForCards,
  numberOfPages,
  page,
  setPage,
  loading,
  getEventsForCards,
}) => {
  const topRef = useRef<any>(null);

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1100);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChangePage = (event: any, newPage: any) => {
    getEventsForCards(newPage);
    setPage(newPage);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Box sx={{ m: 0, p: 0 }} ref={topRef}></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {!loading ? (
          eventsForCards.map((event: any, index: number) =>
            isLargeScreen ? (
              <MapCard key={index} event={event} />
            ) : (
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
            )
          )
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "40vh",
            }}
          >
            <Loader loading={loading} />
          </Box>
        )}
      </Box>
      <Pagination
        count={numberOfPages}
        page={page}
        onChange={handleChangePage}
        color="primary"
      />
    </Box>
  );
};

export default MapCards;
