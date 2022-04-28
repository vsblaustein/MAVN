import * as React from 'react';
import './PopUp.css';
import Box from '@mui/material/Box';
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
        <Box>
          <Box className="modal" class="centered">
            <Box className="mr-modal_content" sx={{ zIndex: 99, width: 600, height: 400, }} >
              <JoinForm></JoinForm>
              <span className="close" onClick={this.handleExit}>
                <Button>
                  Exit
                </Button>
              </span>
            </Box >
          </Box>
        </Box>
      </>
    );
  }

}