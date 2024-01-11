import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

const NameFilters = ({
  handleFilters,
  filters,
}: {
  filters: EventFilters;
  handleFilters: (name: string, value: any) => void;
}) => {
  const { t } = useTranslation();

  return (
    <TextField
      label={t("event.filters.event_name")}
      variant="outlined"
      value={filters.name}
      autoComplete="off"
      onChange={(event) => handleFilters("name", event.target.value)}
    />
  );
};

export default NameFilters;
