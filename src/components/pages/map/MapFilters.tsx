import { Box } from "@mui/material";
import RadiusFilter from "./MapFilters/RadiusFilter";
import { useEffect, useState } from "react";
import { defaultFilters } from "./MapFilters/defaultFilters";
import DateFilter from "./MapFilters/DateFilter";
import NameFilters from "./MapFilters/NameFilters";
import CityFilter from "./MapFilters/CityFilter";

const MapFilters = () => {
  const [filters, setFilters] = useState<EventFilters>(defaultFilters);

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
    </Box>
  );
};

export default MapFilters;
