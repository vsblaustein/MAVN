import React from 'react';
import ResponsiveAppBar from '../ResponsiveAppBar/index'
import PopUp from './PopUp'; 
import './PopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
  
export default class joinPopUp extends React.Component {
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
      <div className="btn" onClick={this.togglePop}>
        <button>Join Room</button>
      </div>
      {this.state.seen ? <PopUp toggle={this.togglePop} /> : null}

      
     </div>
     
    );
   }
  }
  