import { Box, Fade, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getInitialLanguage } from "../utils/utlits";
import { languages } from "../constants/languages";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const [language, setLanguage] = useState(getInitialLanguage());

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleLanguageOptionClick = (value: string) => {
    setAnchorEl(null);
    if (value !== language) {
      setLanguage(value);
    }
  };

  useEffect(() => {
    if (language && i18n.language !== language) {
      localStorage.setItem("language", language);
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  return (
    <Box>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Box
          sx={{ width: 24 }}
          className={languages.find((lang) => lang.value === language)?.flag}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        TransitionComponent={Fade}
        disableScrollLock={false}
      >
        {languages.map((lang) => {
          return (
            <MenuItem
              key={lang.value}
              value={lang.name}
              onClick={() => handleLanguageOptionClick(lang.value)}
            >
              <Box className={lang.flag} style={{ marginRight: "8px" }} />
              {lang.name} ({lang.value.toLocaleUpperCase()})
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;
