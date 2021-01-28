import React, { useState } from "react";
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
import { forgotPassword } from "../lib/auth";

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
  },
  successMessage: {
    fontSize: '18px'
  }
}));

const Login = (props) => {
  const classes = useStyles();
  const [data, updateData] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (e) => {
    updateData({ ...data, [e.target.name]: e.target.value });
  }  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});
    forgotPassword(data.email)
    .then((res) => {
      setEmailSent(true);
        setLoading(false);
      })
      .catch((error) => {
        setError(error?.response?.data);
        setLoading(false);
      });
  }
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
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
          {!emailSent && 
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleFormSubmit}
            >
              {loading ? "Loading... " : "Send Reset Link"}
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>}

          {emailSent && 
          <Grid 
          container
          justify="center"
          className={classes.successMessage}>
            <Grid item>
              Thanks, check your email for a link to reset your password!
            </Grid>
            <Grid item>
                <Link 
                href="/forgot-password" 
                variant="body2">
                {"Didn't get an email?"}
                </Link>
              </Grid> 
            </Grid> 
            }
        </div>
      </Container>
    )
};

export default Login;