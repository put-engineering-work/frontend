import * as React from "react";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import "./i18n/i18n";
import i18n from "./i18n/i18n";
import { I18nextProvider } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import RegisterForm from "./components/login/RegisterForm";
import LoginForm from "./components/login/LoginForm";
import NavBar from "./components/navBar/NavBar";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const language = localStorage.getItem("language");
    if (language) {
      i18n.changeLanguage(language);
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
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/login"
          element={<LoginForm handleLogged={handleLogged} />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
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
