import dayjs from "dayjs";

export const defaultFilters: EventFilters = {
  eventName: "",
  latitude: 52.2297,
  longitude: 21.0122,
  radius: 5000,
  startDate: dayjs().toISOString(),
  selectedCategories: [],
};

export const defaultCity = {
  description: "Warszawa, Poland",
  latitude: 52.2296756,
  longitude: 21.0122287,
  place_id: "ChIJAZ-GmmbMHkcR_NPqiCq-8HI",
};
