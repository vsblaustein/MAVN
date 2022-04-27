import React from 'react';
import JoinPopUp from './JoinPopUp'; 
import './PopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


  
export default class joinPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seen:false,
    };
  }

    togglePop = () => {
     this.setState({
      seen: !this.state.seen
     });
     this.props.setBtn(this.state.seen);
    };

 
  render() {
    return (
     <div>
        
         <div className="centered">
              <div className="btn" onClick={this.togglePop} >
                  <Button  id= "big-btn">Join New Room</Button >
              </div>
            {this.state.seen ? <JoinPopUp 
            toggle={this.togglePop} position="right center"/> : null }
        </div>
     </div>
     
    );
   }
  }
  