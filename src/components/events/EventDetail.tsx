import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  MobileStepper,
  Slide,
  IconButton,
} from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  Room as RoomIcon,
  Category as CategoryIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
} from "@mui/icons-material";
import Image from "../../assets/event.jpg";
import Image1 from "../../assets/event1.jpg";
import Image2 from "../../assets/event2.jpg";

import { coordinates } from "../../constants/coordinates";
import { API_KEY } from "../../constants/keys";
import { useTranslation } from "react-i18next";

interface ApiResponse {
  address: string;
  description: string;
  endDate: string;
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  startDate: string;
  category: string;
}

const images = [Image, Image1, Image2];

const EventDetail = () => {
  const { t } = useTranslation();

  const { eventId } = useParams();
  const [event, setEvent] = useState<ApiResponse | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "left"
  );

  useEffect(() => {
    const handleStepChange = (nextStep: number) => {
      setSlideDirection(nextStep > activeStep ? "left" : "right");
    };

    handleStepChange(activeStep);
  }, [activeStep]);

  //Fetch data
  useEffect(() => {
    setEvent(coordinates[0]);
  }, [eventId]);

  if (!event) {
    // Add loading state or error handling if needed
    return <div>Loading...</div>;
  }

  const {
    address,
    description,
    endDate,
    latitude,
    longitude,
    name,
    startDate,
    category,
  } = event;

  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=17&size=380x220&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=${API_KEY}`;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container>
      <Box mt={3}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {name}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <Card sx={{ display: "flex", flexDirection: "column", mb: 4 }}>
              <Slide
                direction={slideDirection}
                in={true}
                timeout={{ enter: 500, exit: 500 }}
              >
                <CardMedia
                  component="img"
                  alt="Event Image"
                  height="450"
                  image={images[activeStep]}
                  sx={{
                    width: "100%",
                    transition: "transform 0.5s ease-in-out",
                  }}
                />
              </Slide>
              <MobileStepper
                steps={images.length}
                position="static"
                variant="dots"
                activeStep={activeStep}
                nextButton={
                  <IconButton
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === images.length - 1}
                  >
                    <NavigateNextIcon />
                  </IconButton>
                }
                backButton={
                  <IconButton
                    size="small"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    <NavigateBeforeIcon />
                  </IconButton>
                }
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <Box sx={{ p: 1 }}>
                  <Typography
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      mb: 1,
                    }}
                    variant="subtitle1"
                  >
                    <AccessTimeIcon /> {t("event.date_time")}
                  </Typography>
                  <Typography variant="body2">
                    {t("event.start")}: {new Date(startDate).toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    {t("event.end")}: {new Date(endDate).toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      mb: 1,
                    }}
                    variant="subtitle1"
                  >
                    <RoomIcon /> {t("event.address")}
                  </Typography>
                  <Typography sx={{ mb: 2 }} variant="body2">
                    {address}
                  </Typography>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={staticMapUrl}
                      alt="Static Map"
                      style={{ width: "100%" }}
                    />
                  </a>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      mb: 1,
                    }}
                    variant="subtitle1"
                  >
                    <CategoryIcon /> {t("event.category")}
                  </Typography>
                  <Typography variant="body2">{category}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6">{t("event.description")}</Typography>
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EventDetail;
