import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getDataJson } from "../../../../utils/fetchData";

const CityFilter = ({
  handleFilters,
  filters,
}: {
  filters: EventFilters;
  handleFilters: (name: string, value: any) => void;
}) => {
  const [input, setInput] = useState("");
  const [cities, setCities] = useState<any>([]);
  const [selectedCity, setSelectedCity] = useState([]);

  useEffect(() => {
    if (input.length > 2) {
      const fetchCities = async () => {
        const result = await getDataJson(`geodata/autocomplete/${input}`);

        console.log(result.predictions);
        setCities(result.predictions);
      };

      fetchCities();
    }
  }, [input]);

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      getOptionLabel={(option: any) => option.description}
      options={cities}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="City"
          onChange={(e) => setInput(e.target.value)}
        />
      )}
    />
  );
};

export default CityFilter;
