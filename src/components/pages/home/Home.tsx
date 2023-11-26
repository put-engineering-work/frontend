import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import SideBar from "../../sideBar/SideBar";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import EventCard from "../../eventCard/EventCard";
import { events } from "../../../constants/events";

const Home = () => {
  const { t } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    t("homeContent.allEvents")
  );

  useEffect(() => {
    setSelectedCategory(t("homeContent.allEvents"));
  }, [t]);

  const uniqueCategoriesSet = new Set(events.map((event) => event.category));
  const uniqueCategories = Array.from(uniqueCategoriesSet);

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedCategory(event.target.value as string);
  };

  const filteredEvents = events.filter((event) => {
    if (
      selectedCategory === t("homeContent.allEvents") ||
      event.category === selectedCategory
    ) {
      return true;
    }
    return false;
  });

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        {t("homeContent.find")}
      </Typography>
      <Box>
        <FormControl>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange as any}
          >
            <MenuItem
              key={t("homeContent.allEvents")}
              value={t("homeContent.allEvents")}
            >
              {t("homeContent.allEvents")}
            </MenuItem>
            {uniqueCategories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {filteredEvents.map((event, index) => (
        <EventCard
          key={index}
          title={event.title}
          date={event.date}
          description={event.description}
          category={event.category}
          link={event.link}
        />
      ))}
    </Container>
  );
};

export default Home;
