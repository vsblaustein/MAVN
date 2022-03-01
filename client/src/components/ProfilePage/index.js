import React from 'react';
import ResponsiveAppBar from '../ResponsiveAppBar/index'
import Typography from '@mui/material/Typography';
import ProfileIcon from './ProfileIcon';
import './ProfilePage.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
  
// styling for horizontal list
const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
};



export default class profile extends React.Component {
  state = {
   seen: false
   };
  togglePop = () => {
   this.setState({
    seen: !this.state.seen
   });
  };
render() {
  return (
   <div>
       <ResponsiveAppBar />
       <div class = "content" >
       <Typography 
            variant="h2"
            noWrap
            component="div"
            sx={{ ml: "10px", mt: "15px", display: { xs: 'none', md: 'flex' } }}
          >
            <b > Profile Page </b>
          </Typography>
        <ProfileIcon style={flexContainer} class=''></ProfileIcon>
        <Typography 
            variant="h5"
            noWrap
            component="div"
            sx={{ ml: "10px", mt: "15px", display: { xs: 'none', md: 'flex' } }}
          >
            Email: mehdikamal@gmail.com
          </Typography>
          <Typography 
            variant="h5"
            noWrap
            component="div"
            sx={{ ml: "10px", mt: "15px", display: { xs: 'none', md: 'flex' } }}
          >
            Birthday: November 17th
          </Typography>
          <Typography 
            variant="h5"
            noWrap
            component="div"
            sx={{ ml: "10px", mt: "15px", display: { xs: 'none', md: 'flex' } }}
          >
            Gender: Male
          </Typography>
          </div>
   </div>
  );
 }
}