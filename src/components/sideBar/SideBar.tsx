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

import { useNavigate } from "react-router-dom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const SideBar = ({
  isSideBarShow,
  isOpened,
  handleOpened,
}: {
  isSideBarShow: boolean;
  isOpened: boolean;
  handleOpened: any;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function handleMobile() {
    if (window.innerWidth < 768) {
      handleOpened();
    }
  }

  return (
    <>
      <Drawer
        sx={{
          width: isOpened ? drawerWidth : 60,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isOpened ? drawerWidth : 60,
            transition: "width 0.3s ease-in-out",
            boxSizing: "border-box",
            overflowX: "hidden",
            "@media (max-width: 768px)": {
              height: isOpened ? "100%" : 64,
              width: isOpened ? "100%" : 60,
              overflow: "hidden",
              transition: isOpened
                ? "width 0.3s ease-in-out"
                : "height 0.00001ms 0.15s, width 0.3s ease-in-out",
              border: 0,
              backgroundColor: isOpened ? "" : "transparent",
            },
          },
          display: isSideBarShow ? "flex" : "none",
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar
          className="custom-toolbar "
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton sx={{ padding: "16px" }} onClick={handleOpened}>
            {isOpened ? <ArrowBackIcon /> : <ArrowForwardIcon />}
          </IconButton>
        </Toolbar>
        <Divider
          sx={{
            "@media (max-width: 768px)": {
              transition: "transform 0.2s",
              transform: isOpened ? "translateX(0)" : "translateX(-150%)",
              // display: isOpened ? "block" : "none",
            },
          }}
        />
        <List
          className="side-bar-menu"
          sx={{
            "@media (max-width: 768px)": {
              transition: "transform 0.2s",
              transform: isOpened ? "translateX(0)" : "translateX(-150%)",
              // display: isOpened ? "block" : "none",
            },
          }}
        >
          <ListItem
            key={t("sideBar.home")}
            disablePadding
            onClick={() => {
              navigate("/home");
              handleMobile();
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={t("sideBar.home")} />
            </ListItemButton>
          </ListItem>

          <ListItem
            key={t("sideBar.map")}
            disablePadding
            onClick={() => {
              navigate("/map");
              handleMobile();
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <MapIcon />
              </ListItemIcon>
              <ListItemText primary={t("sideBar.map")} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider
          sx={{
            "@media (max-width: 768px)": {
              transition: "transform 0.2s",
              transform: isOpened ? "translateX(0)" : "translateX(-150%)",
              // display: isOpened ? "block" : "none",
            },
          }}
        />
        <List
          sx={{
            "@media (max-width: 768px)": {
              transition: "transform 0.2s",
              transform: isOpened ? "translateX(0)" : "translateX(-150%)",
              // display: isOpened ? "block" : "none",
            },
          }}
        >
          <ListItem
            key={t("sideBar.home")}
            disablePadding
            onClick={() => {
              navigate("/my_events");
              handleMobile();
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <EmojiEventsIcon />
              </ListItemIcon>
              <ListItemText primary={t("sideBar.my_event")} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default SideBar;
