import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "react-i18next";

const DateFilter = ({
  handleFilters,
  filters,
}: {
  filters: EventFilters;
  handleFilters: (name: string, value: any) => void;
}) => {
  const { t, i18n } = useTranslation();

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={i18n.language}
      localeText={{
        clearButtonLabel: t("general.clear"),
        okButtonLabel: t("general.confirm"),
      }}
    >
      <DateTimePicker
        onChange={(value) =>
          handleFilters("startDate", value ? value.format() : "")
        }
        name="endDate"
        format={"DD-MM-YYYY HH:mm"}
        ampm={false}
        minDate={dayjs()}
        label={t("event.add_event.start_date")}
        sx={{
          width: "100%",
          mb: 2,
        }}
        slotProps={{
          actionBar: {
            actions: ["clear", "accept"],
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DateFilter;
