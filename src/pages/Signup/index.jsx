import React, { useContext, useState } from "react";

import lodash from "lodash";
import { useMutation } from "@apollo/react-hooks";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Box,
  Grid,
  Link,
  Paper,
  Avatar,
  Button,
  TextField,
  Typography,
  CssBaseline,
  CircularProgress,
} from "@material-ui/core";

import { REGISTER_USER } from "../../graphql";
import { AuthContext } from "../../context/auth";
import { Alert, Copyright, PasswordMeter } from "../../widgets";

import schema from "./schema";
import useStyles from "./styles";

function SignUp(props) {
  const { history } = props;

  const classes = useStyles();
  const context = useContext(AuthContext);
  const [alertError, setAlertError] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
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
          <Avatar className={classes.avatar} src="/images/logo_black.svg" />
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
