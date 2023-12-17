import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

import { API_KEY } from "../../constants/keys";
import { useTranslation } from "react-i18next";
import AvatarImage from "../../assets/1.png";
import { getDataJson, getDataText, postData } from "../../utils/fetchData";

const images = [Image, Image1, Image2];

const EventDetail = () => {
  const { t } = useTranslation();

  const { eventId } = useParams();
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "left"
  );
  const [joinEventText, setJoinEventText] = useState<string>("");
  const [userEventRole, setUserEventRole] = useState<string>("");
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const handleStepChange = (nextStep: number) => {
      setSlideDirection(nextStep > activeStep ? "left" : "right");
    };

    handleStepChange(activeStep);
  }, [activeStep]);

  const fetchIsRegisteredInfo = async () => {
    try {
      const userRole = await getDataText(`events/is-registered/${eventId}`);

      console.log(userRole);

      if (userRole === "ROLE_GUEST") {
        setJoinEventText("Leave event");
        setUserEventRole(userRole);
      } else if (userRole === "ROLE_HOST") {
        setUserEventRole(userRole);
      } else {
        setUserEventRole("");
        setJoinEventText("Join event");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchEventDetails = async () => {
    try {
      const event = await getDataJson(`events/event/${eventId}`);
      
      console.log(event);

      setEvent(event);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchMembers = async () => {
    try {
      const members = await getDataJson(`events/event/${eventId}/members`);

      console.log(members);
      setMembers(members);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleJoinEvent = async () => {
    try {
      console.log(userEventRole);
      if (userEventRole !== "ROLE_GUEST") {
        const addUser = await postData(`events/${eventId}/add-user`, {});

        console.log(addUser);

        if (addUser.code === "OK") {
          setJoinEventText("Leave event");
        } else {
          setJoinEventText("Join event");
        }

        fetchIsRegisteredInfo();
      } else {
        const removeMe = await postData(`events/remove-me/${eventId}`, {});

        console.log(removeMe);

        if (removeMe.code === "OK") {
          console.log(1);
          setJoinEventText("Join event");
        } else {
          setJoinEventText("Leave event");
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
    host,
  } = event;

  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=17&size=380x220&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=${API_KEY}`;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box mx={10}>
      <Box mt={3}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            mb: 5,
            gap: 10,
            justifyContent: "space-between",
            alignItems: "center",
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
                  Host of the event:
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
              <Typography variant="h6">Hosted events rating:</Typography>
              <Rating name="simple-controlled" value={4} readOnly />
            </Box>
          </Box>
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
            {joinEventText}
          </Button>
        </Box>
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
          <Grid item xs={12} sm={3}>
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
                  <Typography variant="body2"></Typography>
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
    </Box>
  );
};

export default EventDetail;
