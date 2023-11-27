import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import { useTranslation } from "react-i18next";

interface EventCardProps {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
}

const EventCard: React.FC<EventCardProps> = ({
  name,
  startDate,
  description,
  category,
}) => {
  const { t } = useTranslation();

  const startDateObject = new Date(startDate);
  const formattedStartDate = startDateObject.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <Link href={"/"} sx={{ border: "1px solid #ccc", textDecoration: "none" }}>
      <Card className="card">
        <CardContent>
          <img src="" alt="image" />
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {t("homeContent.categories")}: {category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formattedStartDate}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
