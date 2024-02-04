import { Autocomplete, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getDataJson } from "../../../../utils/fetchData";
import { useTranslation } from "react-i18next";

const CategotyFilter = ({
  filters,
  setFilters,
}: {
  filters: EventFilters;
  setFilters: Dispatch<SetStateAction<EventFilters>>;
}) => {
  const { t } = useTranslation();

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const categories = await getDataJson(`events/all-categories`);
    setCategories(categories);
  };

  const handleCategories = (_: any, values: any) => {
    setFilters((prevData) => ({
      ...prevData,
      selectedCategories: values,
    }));
  };

  return (
    <Autocomplete
      sx={{ minWidth: "100%", mb: 2 }}
      multiple
      id="categories"
      options={categories}
      getOptionLabel={(option) => t(`event.add_event.cateoriess.${option}`)}
      onChange={handleCategories}
      value={filters.selectedCategories}
      renderInput={(params) => (
        <TextField {...params} label={t("event.add_event.categories")} />
      )}
      disableCloseOnSelect
    />
  );
};

export default CategotyFilter;
