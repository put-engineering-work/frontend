import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Image from "../../../assets/welcome.png";
import { useNavigate } from "react-router-dom";

const WelcomeSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 5,
        marginBottom: "2rem",
      }}
    >
      <Box
        sx={{
          flex: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          gap: "2rem",
        }}
      >
        <Typography component="h1" variant="h3">
          {t("homeContent.welcome.greetings")}
        </Typography>
        <Typography sx={{ fontSize: "1.2rem" }}>
          {t("homeContent.welcome.message")}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            color: "#fff",
            backgroundColor: "#42A5F5",
            width: "fit-content",
            padding: "1% 3%",
            borderRadius: "13px",
          }}
          onClick={() => {
            navigate("/map");
          }}
        >
          {t("homeContent.welcome.find")}
        </Button>
      </Box>
      <Box
        sx={{
          flex: 2,
          "@media (max-width: 1240px)": {
            display: "none",
          },
        }}
      >
        <img style={{ width: "100%" }} src={Image} alt="Welcome Image" />
      </Box>
    </Box>
  );
};

export default WelcomeSection;
