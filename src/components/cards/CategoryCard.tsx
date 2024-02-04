import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, image }) => {
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        border: "1px solid #ccc",
        textDecoration: "none",
        borderRadius: 2,
        width: 170,
        display: "flex",
        justifyContent: "center",
        "@media (max-width: 628px)": {
          width: "65%",
        },
      }}
    >
      <CardContent
        sx={{
          padding: 1,
          pt: 2,
        }}
      >
        <Link style={{ textDecoration: "none" }} to={`/map`}>
          <img
            width="100%"
            height="110px"
            style={{ objectFit: "contain" }}
            src={image}
            alt="image"
            className="event-card"
          />
          <Typography
            sx={{ color: "text.primary", textAlign: "center" }}
            variant="h6"
            component="div"
          >
            {t(`category.${name}`)}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
