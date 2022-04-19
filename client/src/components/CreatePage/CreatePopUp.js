import * as React from 'react';
import './CreatePopUp.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CreateForm from './CreateForm';


export default class CreatePopUp extends React.Component {
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
            <Box className="mr-modal_content">
                
                
                <CreateForm></CreateForm>

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