import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import StarsIcon from "@mui/icons-material/Stars";
import RecommendIcon from "@mui/icons-material/Recommend";
import { Drawer, Toolbar, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { drawerWidth } from "../../utils/Constants";
import { useTranslation } from "react-i18next";
import "./SideBar.css";
import MenuIcon from "@mui/icons-material/Menu";

const SideBar = ({
  onItemClick,
  onToggleSidebar,
}: {
  onItemClick: (item: string) => void;
  onToggleSidebar: () => void;
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    setOpen(!open);
    onToggleSidebar();
  };

  return (
    <>
      <Drawer
        sx={{
          width: open ? drawerWidth : 60,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : 60,
            boxSizing: "border-box",
            overflowX: "hidden",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar className="custom-toolbar ">
          <IconButton sx={{ padding: "16px" }} onClick={toggleSidebar}>
            {open ? <ArrowBackIcon /> : <ArrowForwardIcon />}
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          <ListItem key={t("sideBar.home")} disablePadding>
            <ListItemButton onClick={() => onItemClick("home")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={t("sideBar.home")} />
            </ListItemButton>
          </ListItem>
          <ListItem key={t("sideBar.map")} disablePadding>
            <ListItemButton onClick={() => onItemClick("map")}>
              <ListItemIcon>
                <MapIcon />
              </ListItemIcon>
              <ListItemText primary={t("sideBar.map")} />
            </ListItemButton>
          </ListItem>
          <ListItem key={t("sideBar.ratings")} disablePadding>
            <ListItemButton onClick={() => onItemClick("ratings")}>
              <ListItemIcon>
                <StarsIcon />
              </ListItemIcon>
              <ListItemText primary={t("sideBar.ratings")} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem key={t("sideBar.recommendation")} disablePadding>
            <ListItemButton onClick={() => onItemClick("recommendation")}>
              <ListItemIcon>
                <RecommendIcon />
              </ListItemIcon>
              <ListItemText primary={t("sideBar.recommendation")} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default SideBar;
