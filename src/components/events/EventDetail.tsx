import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  MobileStepper,
  Slide,
  IconButton,
  Avatar,
  Rating,
  Button,
  Breadcrumbs,
} from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  Room as RoomIcon,
  Category as CategoryIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
} from "@mui/icons-material";
import Image from "../../assets/event.jpg";

import { API_KEY } from "../../constants/keys";
import { useTranslation } from "react-i18next";
import AvatarImage from "../../assets/1.png";
import { getDataJson, postData } from "../../utils/fetchData";
import EventDetailsMembers from "./members/EventDetailsMembers";
import { StyledBreadcrumb } from "../../utils/StyledBreadcrumb";
import { getToken } from "../../utils/getToken";

const EventDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { eventId } = useParams();
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "left"
  );
  const [joinEventText, setJoinEventText] = useState<string>("JOIN");
  const [userEventRole, setUserEventRole] = useState<string>("NULL");
  const [members, setMembers] = useState<Member[]>([]);

  const [images, setImages] = useState<any>([]);

  useEffect(() => {
    const handleStepChange = (nextStep: number) => {
      setSlideDirection(nextStep > activeStep ? "left" : "right");
    };

    handleStepChange(activeStep);
  }, [activeStep]);

  const fetchIsRegisteredInfo = async () => {
    try {
      const userRole = await getDataJson(`events/is-registered/${eventId}`);

      if (userRole.message === "ROLE_GUEST") {
        setJoinEventText("LEAVE");
        setUserEventRole(userRole.message);
      } else if (userRole.message === "ROLE_HOST") {
        setUserEventRole(userRole.message);
      } else {
        setUserEventRole("NULL");
        setJoinEventText("JOIN");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getImages = (eventImages: any) => {
    if (!Array.isArray(eventImages)) {
      return [];
    }

    return eventImages.map(
      (imageObj) => `data:image/png;base64,${imageObj.image}`
    );
  };

  const fetchEventDetails = async () => {
    try {
      const event = await getDataJson(`events/event/${eventId}`);

      const images = getImages(event.eventImages);
      if (images.length === 0) {
        setImages([Image]);
      } else {
        setImages(images);
      }

      setEvent(event);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchMembers = async () => {
    try {
      const members = await getDataJson(`events/event/${eventId}/members`);

      setMembers(members);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleJoinEvent = async () => {
    try {
      if (userEventRole !== "ROLE_GUEST") {
        const addUser = await postData(`events/${eventId}/add-user`, {});

        if (addUser.code === "OK") {
          setJoinEventText("LEAVE");
          setUserEventRole("ROLE_GUEST");
        } else {
          setJoinEventText("JOIN");
          setUserEventRole("NULL");
        }

        fetchIsRegisteredInfo();
      } else {
        const removeMe = await postData(`events/remove-me/${eventId}`, {});

        if (removeMe.code === "OK") {
          setJoinEventText("JOIN");
          setUserEventRole("NULL");
        } else {
          setJoinEventText("LEAVE");
          setUserEventRole("ROLE_GUEST");
        }
      }

      fetchEventDetails();
      fetchMembers();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchEventDetails();
    fetchIsRegisteredInfo();
    fetchMembers();
  }, [eventId]);

  if (!event) {
    // Add loading state or error handling if needed
    return <div>{t("general.loading")}...</div>;
  }

  const handleChatButton = () => {
    navigate(`chat`, { state: { eventId: eventId, eventName: event.name } });
  };

  const {
    address,
    description,
    endDate,
    latitude,
    longitude,
    name,
    startDate,
    host,
    categories,
  } = event;

  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=17&size=380x220&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=${API_KEY}`;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ mx: 10, mt: 3, maxWidth: "1600px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          mb: 5,
          gap: 10,
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Avatar
              sx={{ width: 70, height: 70, marginRight: 2 }}
              src={AvatarImage}
              alt="image"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                }}
                variant="body2"
                color="text.secondary"
              >
                {t("event.host")} :
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
                }}
                variant="body1"
                color="text.main"
              >
                {host.name} {host.lastname}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="h6">{t("event.rating")}:</Typography>
            <Rating name="simple-controlled" value={4} readOnly />
          </Box>
        </Box>
        {getToken() && (
          <Button
            sx={{
              display: userEventRole === "ROLE_HOST" ? "none" : "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "15px",
              padding: "8px 35px",
              fontSize: 14,
              color: "white",
            }}
            variant="contained"
            onClick={handleJoinEvent}
          >
            {t(`event.join_button.${joinEventText}`)}
          </Button>
        )}
      </Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {name}
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{
          width: "100vh",
        }}
      >
        <Grid item xs={12} lg={8}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              mb: 4,
            }}
          >
            <Slide
              direction={slideDirection}
              in={true}
              timeout={{ enter: 500, exit: 500 }}
            >
              <CardMedia
                component="img"
                alt="Event Image"
                height="450" // Set a fixed height
                image={images[activeStep]}
                sx={{
                  width: "100%",
                  objectFit: "cover", // Ensure the entire image is visible, covering the container
                  minHeight: "450px", // Set a maximum height
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
        <Grid item xs={12} lg={3}>
          <Card sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
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
                    mb: 2,
                  }}
                  variant="subtitle1"
                >
                  <CategoryIcon /> {t("event.category")}
                </Typography>
                <Breadcrumbs aria-label="breadcrumb">
                  {categories.map((item: string) => {
                    return (
                      <StyledBreadcrumb
                        component="a"
                        href="#"
                        label={t(`event.add_event.cateoriess.${item}`)}
                      />
                    );
                  })}
                </Breadcrumbs>

                <Typography variant="body2"></Typography>
              </Box>
            </CardContent>
          </Card>
          {userEventRole !== "NULL" && (
            <Button variant="contained" onClick={handleChatButton}>
              {t("event.open_chat")}
            </Button>
          )}
        </Grid>
      </Grid>
      <Box sx={{ mb: 10 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6">{t("event.description")}</Typography>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        </Box>
      </Box>
      <EventDetailsMembers host={host} members={members} />
    </Box>
  );
};

export default EventDetail;
