import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Image from "../../../assets/search.png";
import Image2 from "../../../assets/plus.png";
import { useNavigate } from "react-router-dom";

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
        {t("homeContent.welcome.greetings")}
      </Typography>
      <Box
        sx={{
          flex: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          gap: "2rem",

          paddingInline: 10,
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
          <img src={Image} width="50px" height="50px" alt="" />
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
              sx={{ border: "unset", padding: "unset", marginTop: 2 }}
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
          <img src={Image2} width="50px" height="50px" alt="" />
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
              sx={{ border: "unset", padding: "unset", marginTop: 2 }}
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
