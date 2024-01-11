import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Divider from "@mui/material/Divider";
import Image from "../../assets/logo.png";
import { Link } from "react-router-dom";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <>
      <Divider
        sx={{
          backgroundColor: "text.primary",
          width: "99%",
        }}
      ></Divider>
      <Box
        className="gray-background"
        sx={{
          display: "block",
          paddingInline: 2,
          paddingTop: 10,
          "@media (max-width:768px)": {
            borderInline: "1px solid",
          },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 2,
            "@media (max-width:768px)": {
              gridTemplateColumns: "unset",
              gap: 4,
            },
          }}
        >
          <img src={Image} width="100%" alt="" />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography component="h1" variant="h5">
              Information
            </Typography>
            <Link style={{ textDecoration: "none" }} to={"/"}>
              <Typography component="p" sx={{ color: "text.primary" }}>
                FAQ
              </Typography>
            </Link>
            <Link style={{ textDecoration: "none" }} to={"/"}>
              <Typography component="p" sx={{ color: "text.primary" }}>
                About us
              </Typography>
            </Link>
            <Link style={{ textDecoration: "none" }} to={"/"}>
              <Typography component="p" sx={{ color: "text.primary" }}>
                Sitemap
              </Typography>
            </Link>
            <Link style={{ textDecoration: "none" }} to={"/"}>
              <Typography component="p" sx={{ color: "text.primary" }}>
                Cooperation
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography component="h1" variant="h5">
              Contact:
            </Typography>
            <Link style={{ textDecoration: "none" }} to={"/"}>
              <Typography component="p" sx={{ color: "text.primary" }}>
                + 48 111 111 111
              </Typography>
            </Link>
            <Link style={{ textDecoration: "none" }} to={"/"}>
              <Typography component="p" sx={{ color: "text.primary" }}>
                leasurelink@mail.com
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography component="h1" variant="h5" textAlign="center">
              Follow us on social media:
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Link style={{ textDecoration: "none" }} to={"/"}>
                <FacebookIcon
                  sx={{ fontSize: 50, color: "text.primary" }}
                ></FacebookIcon>
              </Link>
              <Link style={{ textDecoration: "none" }} to={"/"}>
                <InstagramIcon
                  sx={{ fontSize: 50, color: "text.primary" }}
                ></InstagramIcon>
              </Link>
              <Link style={{ textDecoration: "none" }} to={"/"}>
                <PinterestIcon
                  sx={{ fontSize: 50, color: "text.primary" }}
                ></PinterestIcon>
              </Link>
              <Link style={{ textDecoration: "none" }} to={"/"}>
                <XIcon sx={{ fontSize: 50, color: "text.primary" }}></XIcon>
              </Link>
              <Link to={"/"}>
                <YouTubeIcon
                  sx={{ fontSize: 50, color: "text.primary" }}
                ></YouTubeIcon>
              </Link>
            </Box>
          </Box>
        </Box>
        <Divider
          sx={{
            backgroundColor: "text.primary",
            width: "99%",
          }}
        ></Divider>
        <Typography sx={{ textAlign: "center" }}>
          © 2023 LeasureLink All Rights Reserved{" "}
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
