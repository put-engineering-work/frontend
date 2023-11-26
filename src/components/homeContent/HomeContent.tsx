import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import EventCard from "../eventCard/EventCard";
import { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

const HomeContent: React.FC = () => {
  const { t } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    t("homeContent.allEvents")
  );

  useEffect(() => {
    setSelectedCategory(t("homeContent.allEvents"));
  }, [t]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const events = [
    {
      title: "Event 1",
      date: "01.11.2023",
      description: "The best gaming event ever",
      category: "Games",
      link: "https://example.com",
    },
    {
      title: "Lorem ipsum",
      date: "01.12.2023",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, vel.",
      category: "Category 1",
      link: "https://example.com",
    },
  ];

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
      if (selectedDate && event.date !== selectedDate.toLocaleDateString()) {
        return false;
      }
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

export default HomeContent;
