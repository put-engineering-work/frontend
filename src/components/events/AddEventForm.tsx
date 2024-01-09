import React, { useEffect, useRef, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTranslation } from "react-i18next";
import "dayjs/locale/en";
import "dayjs/locale/pl";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import { API_KEY } from "../../constants/keys";
import { mapOptions } from "../../constants/mapOptions";
import { postFormData } from "../../utils/fetchData";
import { error } from "console";
import { useNavigate } from "react-router-dom";

const AddEventForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const mapRef = useRef<any | null>(null);

  const [mapCenter] = useState({
    lat: 52.409538,
    lng: 16.9191063,
  });

  const [markerPosition, setMarkerPosition] = useState<any>(null);

  const [formData, setFormData] = useState({
    address: "",
    description: "",
    endDate: "",
    latitude: 0,
    longitude: 0,
    name: "",
    startDate: "",
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleMapClick = (event: any) => {
    const clickedLatLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    getAddressByCoordinates(clickedLatLng.lat, clickedLatLng.lng);

    // Update state with the clicked coordinates
    setMarkerPosition(clickedLatLng);
    setFormData((prevData) => ({
      ...prevData,
      latitude: clickedLatLng.lat,
      longitude: clickedLatLng.lng,
    }));
  };

  const handleDataChange = (value: any, name: string) => {
    console.log(name);
    const formattedDate = value.format();

    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedDate,
    }));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted data:", formData);

    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("startDate", formData.startDate);
    formDataToSend.append("endDate", formData.endDate);
    formDataToSend.append("latitude", String(formData.latitude));
    formDataToSend.append("longitude", String(formData.longitude));

    console.log(formDataToSend);

    const result = await postFormData("events/create", formDataToSend);

    if (result.code === "CREATED") {
      console.log("created");
      navigate('/my_events')
    } else {
      console.log("error");
    }
  };

  const getCommonProps = (): any => ({
    sx: {
      width: "100%",
      mb: 2,
    },
    slotProps: {
      actionBar: {
        actions: ["clear", "accept"],
      },
    },
  });

  const getAddressByCoordinates = (lat: number, lng: number) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;

    // Отправляем запрос
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const address = data.results[0].formatted_address;
          console.log(data.results[0]);
          console.log("Address:", getAddressString(address));

          setFormData((prevData) => ({
            ...prevData,
            address: getAddressString(address),
          }));
        } else {
          console.error("No results found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getAddressString = (formattedAddress: string) => {
    const addressArray = formattedAddress.split(", ");
    const [street, city] = addressArray;

    return `${street}, ${city}`;
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        {t("event.add_event.add_event")}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{ mb: 2 }}
          label={t("event.add_event.name")}
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          sx={{ mb: 2 }}
          label={t("event.add_event.address")}
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          sx={{ mb: 2 }}
          label={t("event.add_event.description")}
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
        />
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={i18n.language}
          localeText={{
            clearButtonLabel: t("general.clear"),
            okButtonLabel: t("general.confirm"),
          }}
        >
          <DateTimePicker
            onChange={(value) => handleDataChange(value, "startDate")}
            format={"DD-MM-YYYY HH:mm"}
            ampm={false}
            label={t("event.add_event.start_date")}
            {...getCommonProps()}
          />
        </LocalizationProvider>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={i18n.language}
          localeText={{
            clearButtonLabel: t("general.clear"),
            okButtonLabel: t("general.confirm"),
          }}
        >
          <DateTimePicker
            onChange={(value) => handleDataChange(value, "endDate")}
            name="endDate"
            format={"DD-MM-YYYY HH:mm"}
            ampm={false}
            label={t("event.add_event.end_date")}
            {...getCommonProps()}
          />
        </LocalizationProvider>
        <LoadScriptNext googleMapsApiKey={API_KEY}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "700px" }}
            center={mapCenter}
            zoom={13}
            options={{
              ...mapOptions,
              streetViewControl: false,
            }}
            onClick={handleMapClick}
            onLoad={(map) => {
              if (map) {
                mapRef.current = map;
              }
            }}
          >
            {markerPosition && <Marker position={markerPosition} />}
          </GoogleMap>
        </LoadScriptNext>
        {/*<TextField
          label="Latitude"
          name="latitude"
          type="number"
          value={formData.latitude}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Longitude"
          name="longitude"
          type="number"
          value={formData.longitude}
          onChange={handleChange}
          fullWidth
          margin="normal"
        /> */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Add Event
        </Button>
      </form>
    </Box>
  );
};

export default AddEventForm;
