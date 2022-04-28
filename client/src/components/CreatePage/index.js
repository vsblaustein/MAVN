import React from 'react';
import CreatePopUp from './CreatePopUp';
import './CreateForm.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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
      <Box>

        <Box className="centered">
          <Box className="btn" onClick={this.togglePop} >
            <Button id="big-btn">Create Room</Button >
          </Box>
          {this.state.seen ? <CreatePopUp toggle={this.togglePop} position="right center" /> : null}
        </Box>
      </Box>
    );
  }
}