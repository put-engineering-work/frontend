import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Autocomplete,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTranslation } from "react-i18next";
import "dayjs/locale/en";
import "dayjs/locale/pl";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import { API_KEY } from "../../constants/keys";
import { mapOptions } from "../../constants/mapOptions";
import { getDataJson, postFormData } from "../../utils/fetchData";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import CustomFileInput from "./CustomFileInput";

interface AddEventForm {
  address: string;
  description: string;
  endDate: string;
  latitude: number;
  longitude: number;
  name: string;
  startDate: string;
  categories: string[];
  photos: FileList | null;
}

const AddEventForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const mapRef = useRef<any | null>(null);

  const [categories, setCategories] = useState<string[]>([]);

  const [mapCenter] = useState({
    lat: 52.409538,
    lng: 16.9191063,
  });

  const [markerPosition, setMarkerPosition] = useState<any>(null);

  const [formData, setFormData] = useState<AddEventForm>({
    address: "",
    description: "",
    endDate: "",
    latitude: 0,
    longitude: 0,
    name: "",
    startDate: "",
    categories: [],
    photos: null,
  });

  const [errorForm, setErrorForm] = useState("");

  const fetchCategories = async () => {
    const categories = await getDataJson(`events/all-categories`);
    setCategories(categories);
  };

  useEffect(() => {
    fetchCategories();
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
    const formattedDate = value.format();

    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedDate,
    }));
  };

  const handleCategories = (_: any, values: any) => {
    setFormData((prevData) => ({
      ...prevData,
      categories: values,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileInputChange = (files: FileList | null) => {
    setFormData((prevData) => ({
      ...prevData,
      photos: files,
    }));
  };

  const validateForm = (formData: AddEventForm) => {
    if (!formData.name) {
      setErrorForm("NAME_ERROR");
      return false;
    }

    if (!formData.address) {
      setErrorForm("ADDRESS_ERROR");
      return false;
    }

    if (!formData.startDate) {
      setErrorForm("STARTDATE_ERROR");
      return false;
    }

    if (!formData.endDate) {
      setErrorForm("ENDDATE_ERROR");
      return false;
    }

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (startDate > endDate) {
      setErrorForm("DATE_ERROR");
      return false;
    }

    if (!formData.latitude || !formData.longitude) {
      setErrorForm("COORDINATES_ERROR");
      return false;
    }

    setErrorForm("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      return;
    }

    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("startDate", formData.startDate);
    formDataToSend.append("endDate", formData.endDate);
    formDataToSend.append("latitude", String(formData.latitude));
    formDataToSend.append("longitude", String(formData.longitude));

    if (formData.categories) {
      for (let i = 0; i < formData.categories.length; i++) {
        formDataToSend.append("categories", formData.categories[i]);
      }
    }

    if (formData.photos) {
      for (let i = 0; i < formData.photos.length; i++) {
        formDataToSend.append("photos", formData.photos[i]);
      }
    }

    const result = await postFormData("events/create", formDataToSend);

    if (result.code === "CREATED") {
      navigate("/my_events");
    } else {
      console.log("error");
    }
  };

  const startDateProps = (): any => ({
    sx: {
      width: "100%",
      mb: 2,
    },
    slotProps: {
      actionBar: {
        actions: ["clear", "accept"],
      },
      textField: {
        error: errorForm === "STARTDATE_ERROR" || errorForm === "DATE_ERROR",
      },
    },
  });

  const endDateProps = (): any => ({
    sx: {
      width: "100%",
      mb: 2,
    },
    slotProps: {
      actionBar: {
        actions: ["clear", "accept"],
      },
      textField: {
        error: errorForm === "ENDDATE_ERROR" || errorForm === "DATE_ERROR",
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
    <Box sx={{ width: "100%", px: 5 }}>
      <Typography variant="h5" mb={2}>
        {t("event.add_event.add_event")}
      </Typography>
      <form onSubmit={handleSubmit}>
        <CustomFileInput onChange={handleFileInputChange} />
        <TextField
          error={errorForm === "NAME_ERROR"}
          helperText={
            errorForm === "NAME_ERROR" && t(`event.add_event.NAME_ERROR`)
          }
          sx={{ mt: 2, mb: 2 }}
          label={t("event.add_event.name")}
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          error={errorForm === "ADDRESS_ERROR"}
          helperText={
            errorForm === "ADDRESS_ERROR" && t(`event.add_event.ADDRESS_ERROR`)
          }
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

        <Autocomplete
          sx={{ minWidth: "100%", mb: 2 }}
          multiple
          id="categories"
          options={categories}
          getOptionLabel={(option) => t(`event.add_event.cateoriess.${option}`)}
          onChange={handleCategories}
          value={formData.categories}
          renderInput={(params) => (
            <TextField {...params} label={t("event.add_event.categories")} />
          )}
          disableCloseOnSelect
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
            minDate={dayjs()}
            {...startDateProps()}
            helperText={
              errorForm === "STARTDATE_ERROR" &&
              t("event.add_event.STARTDATE_ERROR")
            }
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
            minDate={dayjs()}
            label={t("event.add_event.end_date")}
            {...endDateProps()}
          />
        </LocalizationProvider>
        {errorForm === "DATE_ERROR" && (
          <Typography color="error">
            {t("event.add_event.DATE_ERROR")}
          </Typography>
        )}
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            mb: 5,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            {t("event.add_event.add_event")}
          </Button>
          {errorForm === "COORDINATES_ERROR" && (
            <Typography color="error">
              {t("event.add_event.LOCATION")}
            </Typography>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default AddEventForm;
