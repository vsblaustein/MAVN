import React from 'react';
import Typography from '@mui/material/Typography';
import CreateForm from './CreateForm';
import CreatePopUp from './CreatePopUp';
import './CreatePopUp.css';
import Button from '@mui/material/Button';

  
export default class create extends React.Component {
  state = {
   seen: false
   };

  // toggles so the pop up is visible and opposite button is not
  togglePop = () => {
   this.setState({
    seen: !this.state.seen
   });
   this.props.setBtn(this.state.seen);
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