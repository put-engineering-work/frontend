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
  isSidebarOpen: boolean;
}> = ({ colorMode, theme, isLogged, handleLogged, isSidebarOpen }) => {
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
    navigate("/login");
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
        paddingLeft: isSidebarOpen ? drawerWidth + 50 + `px` : `110px`,
      }}
    >
      {isLogged || checkPermiisons() ? (
        <Typography
          variant="h4"
          component="div"
          sx={{
            flexGrow: 1,
            // width: `calc(100% - ${drawerWidth}px)`,
            // ml: `${drawerWidth}px`,
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
          }}
        >
          LeisureLink
        </Typography>
      )}

      <LanguageSwitcher />
      <IconButton
        sx={{ ml: 1, mr: 2 }}
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
            <MenuItem key="Account" onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Account</Typography>
            </MenuItem>
            <MenuItem key="Dashboard" onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Dashboard</Typography>
            </MenuItem>
            <MenuItem key="Logout" onClick={logoutUserMenu}>
              <Link href="/login" underline="none">
                <Typography textAlign="center">Logout</Typography>
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default NavBar;
