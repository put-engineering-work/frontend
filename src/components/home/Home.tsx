import { Box } from "@mui/material";
import SideBar from "../sideBar/SideBar";
import React, { useState, useEffect } from "react";
import HomeContent from "../homeContent/HomeContent";

// const Home = () => {
//   return (
//     <Box>
//       <SideBar />
//     </Box>
//   );
// };

const Home = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleSidebarItemClick = (item: string) => {
    setSelectedItem(item);
  };
  useEffect(() => {
    setSelectedItem("home");
  }, []);

  return (
    <Box>
      <SideBar onItemClick={handleSidebarItemClick} />
      {selectedItem === "home" && <HomeContent />}
      {/* {selectedItem === "map" && <MapContent />}
      {selectedItem === "ratings" && <RatingsContent />}
      {selectedItem === "recommendation" && <RecommendationContent />} */}
    </Box>
  );
};

export default Home;
