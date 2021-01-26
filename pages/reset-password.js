import React, { useState } from "react";
import { useRouter } from 'next/router';
import { 
  Button, 
  TextField, 
  Container, 
  CssBaseline, 
  Avatar,
  Typography,
  Grid,
  Link
} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { resetPassword } from "../lib/auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  thankYou: {
    fontSize: '21px'
  }
}));

const Login = (props) => {
  const router = useRouter();
  const { code } = router.query;
  const classes = useStyles();
  const [data, updateData] = useState({ code: code, password: "", passwordConfirmation: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);

  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }  
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          {Object.entries(error).length !== 0 &&
            error.constructor === Object &&
            error.message.map((error) => {
              return (
                <div
                  key={error.messages[0].id}
                  style={{ marginBottom: 10 }}
                >
                  <small style={{ color: "red" }}>
                    {error.messages[0].message}
                  </small>
                </div>
              );
            })}
          {!passwordReset && 
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => onChange(event)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="passwordConfirmation"
              label="Confirm Password"
              type="password"
              id="passwordConfirmation"
              autoComplete="current-password"
              onChange={(event) => onChange(event)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                alert(data.password);
                setLoading(true);
                resetPassword(data.code, data.password, data.passwordConfirmation)
                .then((res) => {
                    setPasswordReset(true);
                    setLoading(false);
                  })
                  .catch((error) => {
                    setError(error?.response?.data);
                    setLoading(false);
                  });
              }}
            >
              {loading ? "Loading... " : "Reset Password"}
            </Button>
          </form>}

          {passwordReset && 
          <>
          <Grid>
            You have successfully reset your password
          </Grid>
          <Grid>
            <Link 
            href="/login" 
            variant="body2">
            {"Click here to login"}
            </Link>
            </Grid> 
            </>}
        </div>
      </Container>
    )
};

export default Login;