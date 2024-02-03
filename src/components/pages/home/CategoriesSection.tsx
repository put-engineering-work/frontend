import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CategoryCard from "../../cards/CategoryCard";
import { categories } from "../../../constants/categories";

const CategoriesSection = () => {
  const { t } = useTranslation();

  const slicedCategories = categories.slice(0, 6);

  console.log(slicedCategories);

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
          gap: 3,
          rowGap: 5,
          marginBlock: 5,
          "@media (max-width: 768px)": {
            justifyContent: "center",
          },
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
