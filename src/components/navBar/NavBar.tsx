import { Box, IconButton, Theme, Typography } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { FC } from "react";
import { drawerWidth } from "../../utils/Constants";
import LanguageSwitcher from "../LanguageSwitcher";

const NavBar: FC<{ colorMode: any; theme: Theme }> = ({ colorMode, theme }) => {
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
      <Typography
        variant="h4"
        component="div"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        LeisureLink
      </Typography>
      <LanguageSwitcher />
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
};

export default NavBar;
