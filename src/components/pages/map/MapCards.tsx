import { Box, Pagination } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import EventCard from "../../cards/EventCard";
import DefaultImage from "../../../assets/event.jpg";
import MapCard from "./MapCard";

interface MapComponentProps {
  events: EventCard[];
}

const MapCards: React.FC<MapComponentProps> = ({ events }) => {
  const itemsPerPage = 10;
  const [page, setPage] = useState<number>(1);
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
    setPage(newPage);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const count = Math.ceil(events.length / itemsPerPage);

  const currentEvents = events.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

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
        {currentEvents.map((event, index) =>
          isLargeScreen ? (
            <MapCard event={event} />
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
        )}
      </Box>
      <Pagination
        count={count}
        page={page}
        onChange={handleChangePage}
        color="primary"
      />
    </Box>
  );
};

export default MapCards;
