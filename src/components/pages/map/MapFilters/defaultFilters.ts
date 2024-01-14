import dayjs from "dayjs";

export const defaultFilters: EventFilters = {
  eventName: "",
  latitude: 52.2297,
  longitude: 21.0122,
  radius: 5000,
  startDate: dayjs().toISOString(),
  selectedCategories: [],
};
