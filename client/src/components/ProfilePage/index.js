import React from 'react';
import ResponsiveAppBar from '../ResponsiveAppBar/index'
import Typography from '@mui/material/Typography';
import ProfileIcon from './ProfileIcon';
import './ProfilePage.css';
import Axios from 'axios';
import Box from '@mui/material/Box';
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
  constructor(){
    super();
    this.state = {
      seen: false,
      username: "",
      birthday:"",
      email:"",
  
    };
  }
  
  // load user information
  componentDidMount() {
    const curr_user = JSON.parse(localStorage.getItem('user'));

    // store the user in local storage
    Axios.get('http://localhost:3001/getProfile', {
      params: { name: curr_user }
    }).then((response) => {


      this.setState({
        username: response.data[0].username,
        // make the birthday a prettier thing
        birthday: response.data[0].dob.substring(0,response.data[0].dob.toString().indexOf("T")),
        email: response.data[0].email,
      })
    }).catch(err => {
      console.log(err);
    });
  }


  render() {
    const curr_user = JSON.parse(localStorage.getItem('user'));
    return (
      <Box>
        <ResponsiveAppBar currentUser = {curr_user} />
        <Box class="content" >
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
            Email: {this.state.email}
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ ml: "10px", mt: "15px", display: { xs: 'none', md: 'flex' } }}
          >
            Birthday: {this.state.birthday}
          </Typography>

        </Box>
      </Box>
    );
  }
}
