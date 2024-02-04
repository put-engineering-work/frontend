import { useState, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

const RadiusFilter = ({
  handleFilters,
  filters,
}: {
  filters: EventFilters;
  handleFilters: (name: string, value: any) => void;
}) => {
  const { t } = useTranslation();

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFilters("radius", Number(event.target.value));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    handleFilters("radius", newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
      }}
    >
      <label htmlFor="rangeInput">{t("event.filters.select_radius")}:</label>
      <input
        type="range"
        id="rangeInput"
        name="rangeInput"
        min="0"
        max="50000"
        value={filters.radius}
        onChange={handleRangeChange}
      />
      <br />
      <TextField
        label={t("event.filters.radius")}
        variant="outlined"
        value={filters.radius}
        onChange={handleInputChange}
      />
    </Box>
  );
};

export default RadiusFilter;
