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

import { AuthContext } from "../context/auth";
import { Alert, Copyright, PasswordMeter } from "../widgets";
import { CustomThemeContext } from "../context/theme";
import { REGISTER_USER } from "../graphql";

const schema = yup.object().shape({
  username: yup.string().required().label("Username"),
  email: yup.string().email().required().label("Email"),
  password: yup.string().required().label("Password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required()
    .label("Confirm Password"),
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

function SignUp(props) {
  const { history } = props;

  const classes = useStyles();
  const context = useContext(AuthContext);
  const [alertError, setAlertError] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const { currentTheme } = useContext(CustomThemeContext);
  const [addUser, { loading }] = useMutation(REGISTER_USER);
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onCloseAlert = () => setAlertVisible(false);

  const onSubmit = (values) => {
    if (!loading) {
      addUser({
        update(_, { data: { register: userData } }) {
          context.login(userData);
          history.push("/");
        },
        variables: values,
      })
        .catch(({ graphQLErrors, networkError }) => {
          if (graphQLErrors.length > 0 && !networkError) {
            let errors = graphQLErrors[0].extensions.exception.errors;
            setAlertError(errors.password || errors.email);
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
            Sign Up
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  error={!lodash.isEmpty(errors.username)}
                  helperText={errors.username?.message}
                  id="username"
                  required
                  autoFocus
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  label="Username"
                  autoComplete="username"
                  {...field}
                />
              )}
            />
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
                  autoComplete="new-password"
                  {...field}
                />
              )}
            />
            <PasswordMeter password={watch("password") || ""} />
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  error={!lodash.isEmpty(errors.confirmPassword)}
                  helperText={errors.confirmPassword?.message}
                  fullWidth
                  required
                  id="confirmPassword"
                  variant="outlined"
                  margin="normal"
                  label="Confirm Password"
                  type="password"
                  autoComplete="confirm-new-password"
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
                <>Sign Up</>
              )}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign In
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

export default SignUp;
