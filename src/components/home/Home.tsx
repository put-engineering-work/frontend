import { Box } from "@mui/material";
import SideBar from "../sideBar/SideBar";
import React, { useState } from "react";
import HomeContent from "../homeContent/HomeContent";

// const Home = () => {
//   return (
//     <Box>
//       <SideBar />
//     </Box>
//   );
// };

const Home = ({
  isSidebarOpen,
  onSidebarToggle,
}: {
  isSidebarOpen: boolean;
  onSidebarToggle: () => void;
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarItemClick = (item: string) => {
    setSelectedItem(item);
  };

  const toggleSidebar = () => {
    // setIsSidebarOpen(!isSidebarOpen);
    onSidebarToggle();
  };

  return (
    <Box>
      <SideBar
        onItemClick={handleSidebarItemClick}
        onToggleSidebar={toggleSidebar}
      />
      {selectedItem === "home" && <HomeContent />}
      {/* {selectedItem === "map" && <MapContent />}
      {selectedItem === "ratings" && <RatingsContent />}
      {selectedItem === "recommendation" && <RecommendationContent />} */}
    </Box>
  );
};

export default Home;
