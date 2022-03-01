import React from 'react';
import ResponsiveAppBar from '../ResponsiveAppBar/index'
import Typography from '@mui/material/Typography';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
  
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
       <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ ml: "10px", mt: "15px", display: { xs: 'none', md: 'flex' } }}
          >
            Profile Page 
          </Typography>
   </div>
  );
 }
}