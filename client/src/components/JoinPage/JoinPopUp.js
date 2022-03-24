import * as React from 'react';
import './PopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import JoinForm from './JoinForm';


export default class JoinPopUp extends React.Component {
  handleClick = () => {
   this.props.toggle();
  };

  handleExit = () => {
    this.props.toggle();
};

render() {
  return (
    <>
    <div>
        <Box className="modal" class = "centered">
            <Box className="mr-modal_content"  sx={{ width: 600,height: 400,}} >
                
                
                <JoinForm></JoinForm>

                <span className="close" onClick={this.handleExit}>
                    <Button>
                        Exit
                    </Button>
                </span>

                           </Box >
        </Box>
    </div>
</>
  );
 }
}