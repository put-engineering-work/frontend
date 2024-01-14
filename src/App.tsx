import * as React from "react";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import "./i18n/i18n";
import i18n from "./i18n/i18n";
import { I18nextProvider } from "react-i18next";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/pages/home/HomePage";
import RegisterForm from "./components/login/RegisterForm";
import LoginForm from "./components/login/LoginForm";
import NavBar from "./components/navBar/NavBar";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { pink } from "@mui/material/colors";
import MapPage from "./components/pages/map/MapPage";
import SideBar from "./components/sideBar/SideBar";
import EventDetail from "./components/events/EventDetail";
import AddEventForm from "./components/events/AddEventForm";
import Footer from "./components/footer/Footer";
import EventChat from "./components/events/chat/EventChat";
import MyEvents from "./components/pages/myEvents/MyEvents";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [isLogged, setIsLogged] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const language = localStorage.getItem("language");

    if (language) {
      i18n.changeLanguage(language);
    }

    if (localStorage.getItem("user") !== null) {
      setIsLogged(true);
    }
  }, []);

  useEffect(() => {
    console.log(isLogged);
  }, [isLogged]);

  const handleLogged = () => {
    setIsLogged((prev) => !prev);
  };

  const [isOpened, setIsOpened] = useState(true);
  const [isSideBarShow, setIsSideBarShow] = useState(true);

  const handleOpened = () => {
    setIsOpened((prev) => !prev);
  };

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      setIsSideBarShow(false);
      setIsOpened(false);
    } else {
      setIsSideBarShow(true);
    }
  }, [location]);

  // const isSideBarShow = () => {
  //   if (location.pathname === "/login" || location.pathname === "/register") {
  //     handleLogged();
  //   }
  // };

  return (
    <I18nextProvider i18n={i18n}>
      <CssBaseline />
      <NavBar
        isSideBarShow={isSideBarShow}
        colorMode={colorMode}
        theme={theme}
        isLogged={isLogged}
        isOpened={isOpened}
        handleLogged={handleLogged}
        handleOpened={handleOpened}
      />
      <SideBar
        isSideBarShow={isSideBarShow}
        isOpened={isOpened}
        handleOpened={handleOpened}
      />

      <Box
        sx={{
          ml: isSideBarShow ? (isOpened ? "250px" : "70px") : "0px",
          transition: "margin-left 0.3s ease-in-out",
          "@media (max-width: 768px)": {
            ml: 0,
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Routes>
          <Route path="/" element={<Home isLogged={isLogged} />} />
          <Route
            path="/login"
            element={<LoginForm handleLogged={handleLogged} />}
          />
          <Route path="/my_events" element={<MyEvents isLogged={isLogged} />} />
          <Route path="/home" element={<Home isLogged={isLogged} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/add_event" element={<AddEventForm />} />
          <Route path="/events/:eventId" element={<EventDetail />} />
          <Route path="/events/:eventId/chat" element={<EventChat />} />
        </Routes>
        <Footer />
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
