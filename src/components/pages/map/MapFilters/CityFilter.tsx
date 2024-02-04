import { Autocomplete, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getDataJson } from "../../../../utils/fetchData";
import { defaultCity } from "./defaultFilters";

const CityFilter = ({
  mapRef,
  setFilters,
}: {
  mapRef: React.MutableRefObject<any>;
  setFilters: Dispatch<SetStateAction<EventFilters>>;
}) => {
  const [input, setInput] = useState("");
  const [cities, setCities] = useState<any>([]);
  const [selectedCity, setSelectedCity] = useState(defaultCity);

  useEffect(() => {
    if (input.length > 1) {
      const fetchCities = async () => {
        const result = await getDataJson(`geodata/autocomplete/${input}`);

        setCities(result.predictions);
      };

      fetchCities();
    }
  }, [input]);

  useEffect(() => {
    if (selectedCity !== null) {
      setFilters((old: EventFilters) => ({
        ...old,
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
      }));

      if (mapRef.current) {
        mapRef.current.panTo({
          lat: selectedCity.latitude,
          lng: selectedCity.longitude,
        });
      }
    }
  }, [selectedCity]);

  const handleOnChange = (event: any, values: any) => {
    setSelectedCity(values);
  };

  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        getOptionLabel={(option) => option.description}
        options={cities}
        onChange={handleOnChange}
        value={selectedCity}
        sx={{ width: 300 }}
        isOptionEqualToValue={(option, value) => {
          return value.place_id === option.place_id;
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="City"
            onChange={(e) => setInput(e.target.value)}
          />
        )}
      />
    </>
  );
};

export default CityFilter;
