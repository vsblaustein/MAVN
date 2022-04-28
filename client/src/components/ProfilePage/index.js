import React from 'react';
import ResponsiveAppBar from '../ResponsiveAppBar/index'
import Typography from '@mui/material/Typography';
import './ProfilePage.css';
import Axios from 'axios';
import Box from '@mui/material/Box';
import ProfilePopUp from './editProfile.js';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';

var currentUser = JSON.parse(localStorage.getItem('user'));

export default function Profile() {
  const location = useLocation();
  const [username, setUsername] = React.useState("");
  const [birthday, setBirthday] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [profile_img, setProfileImg] = React.useState("");
  const [editProfile, setEditProfile] = React.useState(false);

  
  React.useEffect(() => {
    console.log("location changed");
    currentUser = JSON.parse(localStorage.getItem('user'));
    Axios.get('http://localhost:3001/getProfile', {
      params: { name: window.location.href.split('/')[4] }
    }).then((response) => {
      setUsername(response.data[0].username);
      // make the birthday a prettier thing
      setBirthday(response.data[0].dob.substring(0, response.data[0].dob.toString().indexOf("T")));
      setEmail(response.data[0].email);
      setProfileImg(response.data[0].image_path);
    }).catch(err => {
      console.log(err);
    });
    renderDOM();
  }, [location]);

  const toggleProfile = () => {
    setEditProfile(!editProfile);
  }

  const renderDOM = () => {
    return (
      <Box>
        <ResponsiveAppBar currentUser={currentUser} />
        {/* toggle the pop up to edit, only allow edit if is the user */}
        {editProfile ? <ProfilePopUp username={username}
          birthday={birthday} email={email}
          photo={profile_img} toggle={toggleProfile} setUser={setUsername} /> : null}

        <Box className="content" >
          <Typography
            variant="h2"
            noWrap
            component="div"
            sx={{ ml: "10px", mt: "15px", display: { xs: 'none', md: 'flex' } }}
          >
            <b > Profile Page </b>
          </Typography>
          <Box
            component="img"
            sx={{
              height: '100%',
              width: '100%',
              maxHeight: { xs: '35vh', md: '35vh' },
              maxWidth: { xs: '35vh', md: '35vh' },
            }}
            alt={username}
            src={profile_img}
          />
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ ml: "10px", mt: "15px", display: { xs: 'none', md: 'flex' } }}
          >
            Username: {username}
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ ml: "10px", mt: "15px", display: { xs: 'none', md: 'flex' } }}
          >
            Email: {email}
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ ml: "10px", mt: "15px", display: { xs: 'none', md: 'flex' } }}
          >
            Birthday: {birthday}
          </Typography>
          <br />
          {currentUser === window.location.href.split('/')[4] && <Button onClick={toggleProfile}>
            Edit Information
          </Button>}
        </Box>
      </Box>
    );
  }

  return (
    <>
      {renderDOM()}
    </>
  );
}



