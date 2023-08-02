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
import { Drawer, Toolbar } from "@mui/material";
import { drawerWidth } from "../../utils/Constants";
import { useTranslation } from "react-i18next";

const SideBar = () => {
  const { t } = useTranslation();

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem key={t("sideBar.home")} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={t("sideBar.home")} />
            </ListItemButton>
          </ListItem>
          <ListItem key={t("sideBar.map")} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MapIcon />
              </ListItemIcon>
              <ListItemText primary={t("sideBar.map")} />
            </ListItemButton>
          </ListItem>
          <ListItem key={t("sideBar.ratings")} disablePadding>
            <ListItemButton>
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
            <ListItemButton>
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
