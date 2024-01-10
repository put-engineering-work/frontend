import { Container } from "@mui/material";
import "./HomePage.css";
import WelcomeSection from "./WelcomeSection";
import NearestEvents from "./NearestEvents";
import CategoriesSection from "./CategoriesSection";
import HowToSection from "./HowToSection";

const Home = () => {
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
