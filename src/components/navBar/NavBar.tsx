import {
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Theme,
  Typography,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { FC, useState } from "react";
import { drawerWidth } from "../../utils/Constants";
import LanguageSwitcher from "../LanguageSwitcher";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

const NavBar: FC<{
  colorMode: any;
  theme: Theme;
  isLogged: boolean;
  isOpened: boolean;
  handleLogged: any;
  handleOpened: any;
  isSideBarShow: boolean;
}> = ({
  colorMode,
  theme,
  isLogged,
  isOpened,
  handleLogged,
  handleOpened,
  isSideBarShow,
}) => {
  const { t } = useTranslation();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutUserMenu = () => {
    setAnchorElUser(null);
    handleLogged();
    clearUserData();
    navigate("/");
    toast.info(t(`homeContent.success_logout`));
  };

  const checkPermiisons = () => {
    const data = localStorage.getItem("user");
    if (data !== null) {
      const parsedData = JSON.parse(data);
      if (parsedData.code === "ACCEPTED") {
        return true;
      }
      return false;
    } else {
      return false;
    }
  };

  const clearUserData = () => {
    localStorage.removeItem("user");
  };

  function handleMobile() {
    if (window.innerWidth < 768) {
      handleOpened();
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
      }}
    >
      {isSideBarShow || checkPermiisons() ? (
        <Typography
          variant="h4"
          component="div"
          sx={{
            flexGrow: 1,
            cursor: "pointer",
            width: `calc(100% - ${drawerWidth}px)`,
            ml: isOpened ? `${drawerWidth}px` : 7,
            transition: "all 0.3s ease-in-out",
            "@media (max-width: 768px)": {
              ml: 7,
            },
          }}
          onClick={() => navigate("/")}
        >
          LeisureLink
        </Typography>
      ) : (
        <Typography
          variant="h4"
          component="div"
          sx={{
            flexGrow: 1,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          LeisureLink
        </Typography>
      )}
      {isSideBarShow && !isLogged && (
        <Button
          variant="contained"
          color="primary"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#fff",
            backgroundColor: "#42A5F5",
            borderRadius: "13px",
            mr: 2,
            minWidth: 100,
          }}
          onClick={() => {
            {
              isLogged ? navigate("/map") : navigate("/login");
            }
          }}
        >
          {isLogged ? t("homeContent.welcome.find") : t("login.signIn")}
        </Button>
      )}
      <LanguageSwitcher />
      <IconButton
        sx={{ ml: 1, mr: isLogged ? 2 : 0 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
      {(isLogged || checkPermiisons()) && (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {/* <MenuItem key="Profile" onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem> */}
            <MenuItem key="Logout" onClick={logoutUserMenu}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      )}
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme={theme.palette.mode}
      />
    </Box>
  );
};

export default NavBar;
