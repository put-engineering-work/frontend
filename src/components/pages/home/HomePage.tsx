import { Container } from "@mui/material";
import "./HomePage.css";
import WelcomeSection from "./WelcomeSection";
import NearestEvents from "./NearestEvents";
import CategoriesSection from "./CategoriesSection";
import HowToSection from "./HowToSection";

const Home = ({ isLogged }: { isLogged: boolean }) => {
  return (
    <Container
      component="main"
      sx={{
        maxWidth: "unset!important",
        padding: "10px!important",
      }}
    >
      <WelcomeSection isLogged={isLogged} />
      <NearestEvents />
      <CategoriesSection />
      <HowToSection />
    </Container>
  );
};

export default Home;
