import * as React from "react";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import "./i18n/i18n";
import i18n from "./i18n/i18n";
import { I18nextProvider } from "react-i18next";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/home/Home";
import RegisterForm from "./components/login/RegisterForm";
import LoginForm from "./components/login/LoginForm";
import NavBar from "./components/navBar/NavBar";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { pink } from "@mui/material/colors";
import MapPage from "./components/pages/map/MapPage";
import SideBar from "./components/sideBar/SideBar";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isLogged);
  }, [isLogged]);

  useEffect(() => {
    const language = localStorage.getItem("language");

    if (language) {
      i18n.changeLanguage(language);
    }

    if (localStorage.getItem("user") === null) {
      navigate("/login");
    } else {
      setIsLogged(true);
    }
  }, []);

  const handleLogged = () => {
    setIsLogged((prev) => !prev);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <CssBaseline />
      <NavBar
        colorMode={colorMode}
        theme={theme}
        isLogged={isLogged}
        handleLogged={handleLogged}
      />
      <SideBar isLogged={isLogged} />
      <Box sx={{ ml: isLogged ? "250px" : "0" }}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/login"
            element={<LoginForm handleLogged={handleLogged} />}
          />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </Box>
    </I18nextProvider>
  );
};

export default function ToggleColorMode() {
  const storedMode = localStorage.getItem("colorMode");
  const isValidMode = storedMode === "light" || storedMode === "dark";
  const [mode, setMode] = React.useState<"light" | "dark">(
    isValidMode ? storedMode : "dark"
  );

  const saveModeToLocalStorage = (mode: any) => {
    localStorage.setItem("colorMode", mode);
  };

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          saveModeToLocalStorage(newMode);
          return newMode;
        });
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#42a5f5",
          },
          secondary: pink,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
