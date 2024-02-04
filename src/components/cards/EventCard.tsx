import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Breadcrumbs, Divider } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useTranslation } from "react-i18next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Image1 from "../../assets/1.png";
import { Link } from "react-router-dom";
import { StyledBreadcrumb } from "../../utils/StyledBreadcrumb";

interface EventCardProps {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  address: string;
  latitude: number;
  longitude: number;
  categories: string[];
  link: string;
  photo?: any;
  numberOfMembers?: number;
  host?: Host;
}

const EventCard: React.FC<EventCardProps> = ({
  name,
  startDate,
  categories,
  address,
  link,
  photo,
  numberOfMembers,
  host,
}) => {
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
        borderRadius: 2,
        width: 350,
        display: "flex",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <CardContent
        sx={{
          padding: 0,
          width: "100%",
        }}
      >
        <Link
          style={{ textDecoration: "none", width: "100%" }}
          to={`/events/${link}`}
        >
          <img width="100%" height={220} src={photo} alt="image" />
          <Typography
            sx={{
              mt: 1,
              ml: 2,
              color: "text.primary",
              height: 68,
              wordBreak: "break-all",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
            variant="h5"
            component="div"
          >
            {name}
          </Typography>
        </Link>

        <Divider sx={{ mb: 1 }} />
        <Box
          sx={{ display: "flex", flexDirection: "column", ml: 2, width: "90%" }}
        >
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
            <Breadcrumbs aria-label="breadcrumb" sx={{ height: 70 }}>
              {categories.map((item: string, index: number) => {
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
            {getData(startDate)}
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
              height: 40,
            }}
            variant="body2"
            color="text.primary"
          >
            <LocationOnIcon />
            {address}
          </Typography>

          <Divider sx={{ mb: 2 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Avatar
                sx={{ width: 50, height: 50, marginRight: 2 }}
                src={Image1}
                alt="image"
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 1,
                    width: 100,
                  }}
                  variant="body2"
                  color="text.secondary"
                >
                  {t("homeContent.host")}:
                </Typography>
                <Typography
                  sx={{
                    height: 36,
                    mb: 1,
                    wordBreak: "break-word",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    pr: 1,
                  }}
                  variant="body2"
                  color="text.main"
                >
                  {host?.name} {host?.lastname}
                </Typography>
              </Box>
            </Box>
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
                {numberOfMembers} {t("general.guests")}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCard;
