import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import NavBar from "./components/navBar/NavBar";
import { CssBaseline } from "@mui/material";
import SideBar from "./components/sideBar/SideBar";
import { useEffect, useMemo } from "react";
import "./i18n/i18n";
import i18n from "./i18n/i18n";
import { I18nextProvider } from "react-i18next";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  useEffect(() => {
    const language = localStorage.getItem("language");
    if (language) {
      i18n.changeLanguage(language);
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <Box>
        <CssBaseline />
        <NavBar colorMode={colorMode} theme={theme} />
        <SideBar />
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
