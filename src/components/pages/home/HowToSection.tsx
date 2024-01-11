import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const HowToSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        marginBlock: "2rem",
      }}
    >
      <Typography component="h1" variant="h4">
        {t("homeContent.howTo.how")}
      </Typography>
      <Box
        sx={{
          flex: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          gap: "2rem",
          paddingInline: 10,
          "@media (max-width:768px)": {
            flexDirection: "column",
          },
        }}
      >
        <Box
          className="gray-background"
          sx={{
            flex: 2,
            borderRadius: 2,
            display: "flex",
            flexDirection: "row",
            padding: 2,
            gap: 2,
            alignItems: "center",
          }}
        >
          <SearchIcon sx={{ width: 70, height: "auto" }}></SearchIcon>
          <Box>
            <Typography component="p" sx={{ mb: 1 }}>
              {t("homeContent.find")}
            </Typography>
            <Typography component="p" sx={{ mb: 1 }}>
              {t("homeContent.howTo.explain")}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                navigate("/map");
              }}
              sx={{
                border: "unset",
                padding: "unset",
                marginTop: 2,
                "&:hover": {
                  border: "unset",
                },
              }}
            >
              {t("homeContent.welcome.find")}
            </Button>
          </Box>
        </Box>
        <Box
          className="gray-background"
          sx={{
            flex: 2,
            borderRadius: 2,
            display: "flex",
            flexDirection: "row",
            padding: 2,
            gap: 2,
            alignItems: "center",
          }}
        >
          <AddIcon sx={{ width: 70, height: "auto" }}></AddIcon>
          <Box>
            <Typography component="p" sx={{ mb: 1 }}>
              {t("homeContent.howTo.create")}
            </Typography>
            <Typography component="p" sx={{ mb: 1 }}>
              {t("homeContent.howTo.lorem")}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                navigate("/add_event");
              }}
              sx={{
                border: "unset",
                padding: "unset",
                marginTop: 2,
                "&:hover": {
                  border: "unset",
                },
              }}
            >
              {t("homeContent.howTo.createBtn")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HowToSection;
