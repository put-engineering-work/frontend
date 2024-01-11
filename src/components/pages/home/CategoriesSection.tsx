import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../../cards/CategoryCard";
import { useState } from "react";
import { coordinates } from "../../../constants/coordinates";
import { categories } from "../../../constants/categories";

const CategoriesSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [cardCategories, setCardCategoriess] = useState<CategoryCard[]>([]);

  const slicedCategories = categories.slice(0, 6);
  // setCardCategoriess(slicedCategories);
  return (
    <Box
      sx={{
        marginBlock: "2rem",
      }}
    >
      <Typography component="h1" variant="h4">
        {t("homeContent.categories")}:
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 0.5,
          rowGap: 3,
          justifyContent: "space-evenly",
          marginBlock: 5,
          paddingInline: 5,
        }}
      >
        {/* TODO: */}
        {slicedCategories.map((category, index) => (
          <CategoryCard key={index} name={category.name} id={category.id} />
        ))}
      </Box>
    </Box>
  );
};

export default CategoriesSection;
