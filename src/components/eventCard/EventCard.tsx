import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import "./EventCard.css";

interface EventCardProps {
  title: string;
  date: string;
  description: string;
  category: string;
  link: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  description,
  category,
  link,
}) => {
  return (
    <Link href={link}>
      <Card className="card">
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {date}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {description}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {category}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
