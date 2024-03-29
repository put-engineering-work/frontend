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
          paddingTop: 5,
          width: "100%",
          "@media (max-width:768px)": {
            borderInline: "1px solid",
            padding: "10%",
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
          <img
            className="footer-logo"
            src={Image}
            style={{ width: "12rem" }}
            alt=""
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography component="h1" variant="h5">
              {t("footer.Information")}
            </Typography>
            <Link style={{ textDecoration: "none" }} to={"/faq"}>
              <Typography component="p" sx={{ color: "text.primary" }}>
                FAQ
              </Typography>
            </Link>
            <Link style={{ textDecoration: "none" }} to={"/about"}>
              <Typography component="p" sx={{ color: "text.primary" }}>
                {t("footer.about")}
              </Typography>
            </Link>
            <Link style={{ textDecoration: "none" }} to={"/sitemap"}>
              <Typography component="p" sx={{ color: "text.primary" }}>
                {t("footer.Sitemap")}
              </Typography>
            </Link>
            <Link style={{ textDecoration: "none" }} to={"/cooperation"}>
              <Typography component="p" sx={{ color: "text.primary" }}>
                {t("footer.Cooperation")}
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography component="h1" variant="h5">
              {t("footer.Contact")}:
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
              {t("footer.follow")}:
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <a
                style={{ textDecoration: "none" }}
                href="https://www.facebook.com/"
                target="_blank"
              >
                <FacebookIcon
                  sx={{ fontSize: 50, color: "text.primary" }}
                ></FacebookIcon>
              </a>
              <a
                style={{ textDecoration: "none" }}
                href="https://www.instagram.com/"
                target="_blank"
              >
                <InstagramIcon
                  sx={{ fontSize: 50, color: "text.primary" }}
                ></InstagramIcon>
              </a>
              <a
                style={{ textDecoration: "none" }}
                href="https://www.pinterest.com/"
                target="_blank"
              >
                <PinterestIcon
                  sx={{ fontSize: 50, color: "text.primary" }}
                ></PinterestIcon>
              </a>
              <a
                style={{ textDecoration: "none" }}
                href="https://twitter.com/"
                target="_blank"
              >
                <XIcon sx={{ fontSize: 50, color: "text.primary" }}></XIcon>
              </a>
              <a href="https://www.youtube.com/" target="_blank">
                <YouTubeIcon
                  sx={{ fontSize: 50, color: "text.primary" }}
                ></YouTubeIcon>
              </a>
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
          © 2023 LeasureLink {t("footer.rights")}{" "}
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
