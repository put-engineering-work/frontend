import { Container } from "@mui/material";
import "./HomePage.css";
import WelcomeSection from "./WelcomeSection";
import NearestEvents from "./NearestEvents";

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
    </Container>
  );
};

export default Home;
