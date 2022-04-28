import React from 'react';
import JoinPopUp from './JoinPopUp';
import './PopUp.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default class joinPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seen: false,
    };
  }

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
            <Button id="big-btn">Join New Room</Button >
          </Box>
          {this.state.seen ? <JoinPopUp toggle={this.togglePop} position="right center" /> : null}
        </Box>
      </Box>

    );
  }
}
