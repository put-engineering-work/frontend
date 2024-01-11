import dayjs from "dayjs";

export const defaultFilters: EventFilters = {
  name: "",
  latitude: 52.2297,
  longitude: 21.0122,
  radius: 50,
  startDate: String(dayjs()),
  selectedCategories: [],
};
