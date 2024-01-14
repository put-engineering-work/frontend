import { Box, Button } from "@mui/material";
import RadiusFilter from "./MapFilters/RadiusFilter";
import { useEffect } from "react";
import DateFilter from "./MapFilters/DateFilter";
import NameFilters from "./MapFilters/NameFilters";
import CityFilter from "./MapFilters/CityFilter";
import CategoriesFilter from "./MapFilters/CategoriesFilter";
import { useTranslation } from "react-i18next";

const MapFilters = ({
  filters,
  setFilters,
  fetchData,
}: {
  filters: EventFilters;
  setFilters: React.Dispatch<React.SetStateAction<EventFilters>>;
  fetchData: () => Promise<void>;
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  const handleFilters = (name: string, value: any) => {
    setFilters((old: EventFilters) => ({
      ...old,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <CityFilter filters={filters} handleFilters={handleFilters} />
      <NameFilters filters={filters} handleFilters={handleFilters} />
      <RadiusFilter filters={filters} handleFilters={handleFilters} />
      <DateFilter filters={filters} handleFilters={handleFilters} />
      <CategoriesFilter filters={filters} handleFilters={handleFilters} />
      <Button variant="contained" onClick={fetchData}>{t("map.enter_filters")}</Button>
    </Box>
  );
};

export default MapFilters;
