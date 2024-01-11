import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import { useTheme } from "@mui/material";
import { isValidEmail } from "../../utils/utlits";
import { useTranslation } from "react-i18next";
import Spinner from "../spinner/Spinner";
import { useState } from "react";

export default function SignIn(props: any) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");

    if (!isValidEmail(email)) {
      toast.error(t("login.errors.email"));
      setLoading(false);

      return;
    }

    if (password!.toString().length < 8) {
      toast.error(t(`registration.errors.password_length`));
      setLoading(false);

      return;
    }

    const dataTo = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const response = await fetch("http://localhost:8085/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Method": "*",
        },
        body: JSON.stringify(dataTo),
        mode: "cors",
      });

      const responseData = await response.json();

      if (responseData.code === "ACCEPTED") {
        localStorage.setItem("user", JSON.stringify(responseData));
        props.handleLogged();
        navigate("/home");
      } else {
        toast.error(t(`login.errors.${responseData.message}`));
      }
      setLoading(false);
    } catch (error) {
      toast.error(t(`registration.errors.oops`));
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t(`login.signIn`)}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("registration.email_address")}
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label={t("registration.password")}
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={t("login.remember_me")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t("login.button")}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                style={{ color: theme.palette.text.primary }}
                to={"/register"}
              >
                {t("login.no_account")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme={theme.palette.mode}
      />
      <Spinner loading={loading} />
    </Container>
  );
}
