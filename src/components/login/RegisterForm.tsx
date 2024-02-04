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
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { isValidEmail } from "../../utils/utlits";

import { toast, ToastContainer } from "react-toastify";
import { useTheme } from "@mui/material";
import Spinner from "../spinner/Spinner";

const SignUp = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);

  const [isSubmitButtonDisable, setisSubmitButtonDisable] = useState(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);

    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const repeat_password = data.get("repeat_password");
    const name = data.get("name");
    const lastname = data.get("lastname");

    if (!isValidEmail(email)) {
      toast.error(t(`registration.errors.email`));
      setLoading(false);

      return;
    }

    if (password !== repeat_password) {
      toast.error(t(`registration.errors.passwords`));
      setLoading(false);

      return;
    }

    if (password!.toString().length < 8) {
      toast.error(t(`registration.errors.password_length`));
      setLoading(false);

      return;
    }

    const dataTo = {
      email,
      password,
      name,
      lastname,
    };

    try {
      const response = await fetch("http://localhost:8085/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(dataTo),
        mode: "cors",
      });

      const responseData = await response.json();

      if (responseData.code === "ACCEPTED") {
        navigate("/login");
      } else {
        toast.error(t(`registration.errors.${responseData.code}`));
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
          {t("registration.sign_up")}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label={t("registration.first_name")}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="family-name"
                required
                fullWidth
                id="lastname"
                name="lastname"
                label={t("registration.last_name")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label={t("registration.email_address")}
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label={t("registration.password")}
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="repeat_password"
                label={t("registration.repeat_password")}
                type="password"
                id="repeat_password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label={t("registration.checkbox_text")}
                onChange={() => setisSubmitButtonDisable((prev) => !prev)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitButtonDisable}
            sx={{ mt: 3, mb: 2 }}
          >
            {t("registration.register")}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link style={{ color: theme.palette.text.primary }} to="/login">
                {t("registration.back_tp_login")}
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
        theme={theme.palette.mode}
      />
      <Spinner loading={loading} />
    </Container>
  );
};

export default SignUp;
