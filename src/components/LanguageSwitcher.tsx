import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { getInitialLanguage } from "../utils/utlits";

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const [language, setlanguage] = useState(getInitialLanguage());

  const changeLanguage = (lng: any) => {
    setlanguage(lng.target.value);
    i18n.changeLanguage(lng.target.value);
    saveLanguageToLocalStorage(lng.target.value);
  };

  const saveLanguageToLocalStorage = (language: any) => {
    localStorage.setItem("language", language);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="language-label">{t("navBar.language")}</InputLabel>
        <Select
          labelId="language-label"
          id="language-select"
          value={language}
          label="Language"
          onChange={changeLanguage}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="pl">Polski</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSwitcher;
