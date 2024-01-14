import {
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Theme,
  Typography,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { FC, useEffect, useState } from "react";
import { drawerWidth } from "../../utils/Constants";
import LanguageSwitcher from "../LanguageSwitcher";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

const NavBar: FC<{
  colorMode: any;
  theme: Theme;
  isLogged: Boolean;
  handleLogged: any;
  isOpened: Boolean;
  handleOpened: any;
}> = ({ colorMode, theme, isLogged, handleLogged, isOpened, handleOpened }) => {
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
      {isLogged || checkPermiisons() ? (
        <Typography
          variant="h4"
          component="div"
          sx={{
            flexGrow: 1,
            width: `calc(100% - ${drawerWidth}px)`,
            ml: isOpened ? `${drawerWidth}px` : 7,
            transition: "all 0.3s ease-in-out",
            "@media (max-width: 768px)": {
              ml: 7,
            },
          }}
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
            <MenuItem key="Profile" onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem key="Logout" onClick={logoutUserMenu}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default NavBar;
