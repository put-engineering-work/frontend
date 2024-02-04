import {
  Avatar,
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import DefaultImage from "../../../assets/event.jpg";
import { StyledBreadcrumb } from "../../../utils/StyledBreadcrumb";
import { useTranslation } from "react-i18next";

import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import AvatarImage from "../../../assets/1.png";

const MapCard = ({ event }: { event: EventCard }) => {
  const { t, i18n } = useTranslation();

  const getData = (data: string) => {
    const startDateObject = new Date(data);

    const locate = i18n.language === "pl" ? "pl-PL" : "en-US";

    return startDateObject.toLocaleString(locate, {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <Card
      sx={{
        border: "1px solid #ccc",
        textDecoration: "none",
        borderRadius: 3,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: 0,
          pb: 0,
          width: "100%",
          gap: 3,
        }}
      >
        <Box>
          <Link
            style={{ textDecoration: "none", width: "35%" }}
            to={`/events/${event.id}`}
          >
            <img
              width="100%"
              height="90%"
              src={
                event.eventImages && event.eventImages.length > 0
                  ? ` data:image/png;base64,${event.eventImages[0].image}`
                  : DefaultImage
              }
              alt="image"
            />
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                mt: 1,
                mb: 1,
                color: "text.primary",
                wordBreak: "break-all",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
              variant="h5"
            >
              {event.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <CheckCircleIcon />
              <Typography>
                {event.numberOfMembers} {t("event.guests")}
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{ color: "text.primary", borderWidth: 2, mb: 2 }}
            variant="fullWidth"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              mb: 2,
            }}
          >
            <Typography sx={{ mb: 1 }} variant="body2" color="text.primary">
              {t("homeContent.categories")}:
            </Typography>
            {event.categories.length > 0 ? (
              <Breadcrumbs aria-label="breadcrumb">
                {event.categories.map((item: string, index: number) => {
                  return (
                    <StyledBreadcrumb
                      key={index}
                      component="a"
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                      }}
                      label={t(`event.add_event.cateoriess.${item}`)}
                    />
                  );
                })}
              </Breadcrumbs>
            ) : (
              <Typography sx={{ mb: 1 }} variant="body2" color="text.primary">
                {t("homeContent.no_categories")}
              </Typography>
            )}
          </Box>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              mb: 1,
            }}
            variant="body2"
            color="text.primary"
          >
            <EventIcon />
            {getData(event.startDate)}
          </Typography>

          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              mb: 1,
              wordBreak: "break-all",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
            }}
            variant="body2"
            color="text.primary"
          >
            <LocationOnIcon />
            {event.address}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>{t("event.description")}</Typography>
            <Typography variant="body2" color="textSecondary">
              {event.description.length < 200
                ? event.description
                : event.description.slice(0, 200) + " ..."}
            </Typography>
          </Box>
        </Box>
        <Divider orientation="vertical" sx={{ borderWidth: 2 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "17%",
          }}
        >
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
                mb: 2,
              }}
              variant="body2"
              color="text.secondary"
            >
              {t("event.host")} :
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar
                sx={{ width: "80%", height: "80%" }}
                src={AvatarImage}
                alt="image"
              />
              <Typography
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
                }}
                variant="h6"
                color="text.main"
              >
                {event.host.name} {event.host.lastname}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default MapCard;
