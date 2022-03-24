import React from 'react';
import Typography from '@mui/material/Typography';
import CreateForm from './CreateForm';
import CreatePopUp from './CreatePopUp';
import './CreatePopUp.css';
import Button from '@mui/material/Button';



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
       
       <div class="centered">
              <div className="btn" onClick={this.togglePop} >
                  <Button  id= "big-btn">Create Room</Button >
              </div>
            {this.state.seen ? <CreatePopUp toggle={this.togglePop} position="right center"/> : null }

            
        </div>

          
   </div>
  );
 }
}