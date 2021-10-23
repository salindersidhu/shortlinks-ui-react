import React, { useContext, useState } from "react";
import * as yup from "yup";
import lodash from "lodash";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { makeStyles } from "@mui/styles";
import { useMutation } from "@apollo/react-hooks";
import { yupResolver } from "@hookform/resolvers/yup";

import { Alert, Copyright } from "../widgets";
import { AuthContext } from "../context/auth";
import { CustomThemeContext } from "../context/theme";
import { LOGIN_USER } from "../graphql";

const schema = yup.object().shape({
  email: yup.string().email().required().label("Email"),
  password: yup.string().required().label("Password"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      theme.palette.type === "light"
        ? "url(images/bg_light.jpg)"
        : "url(images/bg_dark.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
  },
  paper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    margin: theme.spacing(8, 4),
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    margin: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const { history } = props;

  const classes = useStyles();
  const context = useContext(AuthContext);
  const [alertError, setAlertError] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const { currentTheme } = useContext(CustomThemeContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onCloseAlert = () => setAlertVisible(false);

  const onSubmit = (values) => {
    if (!loading) {
      loginUser({
        update(_, { data: { login: userData } }) {
          context.login(userData);
          history.push("/");
        },
        variables: values,
      })
        .catch(({ graphQLErrors, networkError }) => {
          if (graphQLErrors.length > 0 && !networkError) {
            setAlertError(graphQLErrors[0].extensions.exception.errors.general);
          } else {
            setAlertError(
              "Cannot communicate with server. Please check your connection and try again."
            );
          }
        })
        .finally(() => setAlertVisible(true));
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} elevation={6} component={Paper} square>
        <div className={classes.paper}>
          <Avatar
            className={classes.avatar}
            src={
              currentTheme === "light"
                ? "/images/logo_black.svg"
                : "/images/logo_white.svg"
            }
          />
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  error={!lodash.isEmpty(errors.email)}
                  helperText={errors.email?.message}
                  id="email"
                  required
                  autoFocus
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  label="Email"
                  autoComplete="email"
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  error={!lodash.isEmpty(errors.password)}
                  helperText={errors.password?.message}
                  fullWidth
                  required
                  id="password"
                  variant="outlined"
                  margin="normal"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  {...field}
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <>Sign In</>
              )}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
      <Alert
        visible={alertVisible}
        onClose={onCloseAlert}
        title="Notification"
        description={alertError}
      />
    </Grid>
  );
}

export default SignIn;
