import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom' ;
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        MaterialUI
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [loginStatus, setLoginStatus] = React.useState("");
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    /*setUsername(data.get('username'));
    setPassword(data.get('password'));
    console.log({
      changed_username: username,
      changed_password: password
    });*/

    console.log("beginning axios.get")
    const user = data.get('username');
    const pass = data.get('password');

    console.log("user: " + user + " pass: " + pass);

    
    Axios.post('http://localhost:3001/login', {
      username: user,
      password: pass
    }).then((response)=> {
      if (response.data.message){
        //wrong combination- invalid login
        console.log(response.data);
        setLoginStatus(response.data.message);
      } else {
        //valid login!
        console.log("Login successful")
        // stores the current user in local storage
        localStorage.setItem('user', JSON.stringify(user))
        //route to home
        navigate("/home", { replace: true });
      }
    }).catch(err => {
      console.log(err);
    });



  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Grid container>
                <Grid item>
                  <Typography variant="caption" sx={{color: "#FF0000"}}>
                    {loginStatus}
                  </Typography>
                </Grid>
              </Grid>
              
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> 
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign in
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <RouterLink to="/signup" style={{ textDecoration: 'none' }}>
                  <Grid item>
                      {"Don't have an account? Sign Up"}
                  </Grid>
                </RouterLink>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}