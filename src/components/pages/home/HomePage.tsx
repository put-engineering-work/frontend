import { Container } from "@mui/material";
import "./HomePage.css";
import WelcomeSection from "./WelcomeSection";
import NearestEvents from "./NearestEvents";
import CategoriesSection from "./CategoriesSection";

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
    </Container>
  );
};

export default Home;
