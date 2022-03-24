import React from 'react';
import JoinPopUp from './JoinPopUp'; 
import './PopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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
        
         <div class="centered">
              <div className="btn" onClick={this.togglePop} >
                  <Button  id= "big-btn">Join New Room</Button >
              </div>
            {this.state.seen ? <JoinPopUp toggle={this.togglePop} position="right center"/> : null }


        </div>


       
     </div>
     
    );
   }
  }
  