import { Container } from "@mui/material";
import "./HomePage.css";
import WelcomeSection from "./WelcomeSection";
import NearestEvents from "./NearestEvents";
import CategoriesSection from "./CategoriesSection";
import HowToSection from "./HowToSection";

import DefaultImage from "../../../assets/event.jpg";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { postData } from "../../../utils/fetchData";

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
      sx={{
        maxWidth: "unset!important",
        padding: "10px!important",
      }}
    >
      <WelcomeSection />
      <NearestEvents />
      <CategoriesSection />
      <HowToSection />
    </Container>
  );
};

export default Home;
