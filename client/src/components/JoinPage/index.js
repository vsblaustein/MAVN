import React from 'react';
import ResponsiveAppBar from '../ResponsiveAppBar/index'
import PopUp from './PopUp'; 
import './PopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import OldRoomPopUp from './OldRoomPopUp'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


const theme = {
  blue: {
    default: "#3f51b5",
    hover: "#283593"
  },
  pink: {
    default: "#e91e63",
    hover: "#ad1457"
  }
};
  
export default class joinPopUp extends React.Component {
    state = {
     seen: false,
     seen2: false,
     };
    togglePop = () => {
     this.setState({
      seen: !this.state.seen
     });
    };

    togglePop2 = () => {
      this.setState({
       seen2: !this.state.seen2
      });
     };
  render() {
    return (
     <div>
         <ResponsiveAppBar />
         <div class="centered">
            <div className="btn" onClick={this.togglePop} >
                <Button  id= "big-btn">Join New Room</Button >
          </div>
            {this.state.seen ? <PopUp toggle={this.togglePop} position="right center"/> : null }
            
                
        </div>


        <div class="centered">
            <div className="btn" onClick={this.togglePop2} >
                <Button id= "big-btn">Join Old Room</Button >
          </div>
            {this.state.seen2 ? <OldRoomPopUp toggle={this.togglePop2} position="right center"/> : null }
            
                
        </div>
     </div>
     
    );
   }
  }
  