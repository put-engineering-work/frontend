import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";

const CategoriesFilter = ({
  handleFilters,
  filters,
}: {
  filters: EventFilters;
  handleFilters: (name: string, value: any) => void;
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOnChange = (event: any, values: any) => {
    setSelectedOptions(values);
  };

  return (
    <Autocomplete
      multiple
      id="multi-autocomplete"
      options={[]}
      //   getOptionLabel={(option) => option.label}
      onChange={handleOnChange}
      value={selectedOptions}
      renderInput={(params) => (
        <TextField {...params} label="Categories" variant="outlined" />
      )}
    />
  );
};

export default CategoriesFilter;
