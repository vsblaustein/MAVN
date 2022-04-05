import React from 'react';
import ResponsiveAppBar from '../ResponsiveAppBar/index'
import Typography from '@mui/material/Typography';
import ProfileIcon from './ProfileIcon';
import './ProfilePage.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

        // store the user in local storage
        Axios.get('http://localhost:3001/getUser', {
        }).then((response)=> {
            // gives a list of json objects
            const genres = JSON.stringify(response.data);
            const arr = []
            // parse the JSON objects
            for(const c in JSON.parse(genres)){
              arr.push(JSON.parse(genres)[c].genre);
            }
            console.log("list of genre: [" + arr + "]");
            localStorage.setItem('genres', arr);

            
          
        }).catch(err => {
          console.log(err);
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
            Email: 
          </Typography>
          <Typography 
            variant="h5"
            noWrap
            component="div"
            sx={{ ml: "10px", mt: "15px", display: { xs: 'none', md: 'flex' } }}
          >
            Birthday: 
          </Typography>
        
          </div>
   </div>
  );
 }
}