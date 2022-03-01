import React from 'react';
import ResponsiveAppBar from '../ResponsiveAppBar/index'
import Typography from '@mui/material/Typography';
import CreateForm from './CreateForm';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
  
export default class create extends React.Component {
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

          
          <CreateForm></CreateForm>
   </div>
  );
 }
}