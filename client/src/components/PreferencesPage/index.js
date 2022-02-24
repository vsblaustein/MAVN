import ResponsiveAppBar from '../ResponsiveAppBar/index'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PQPopUp from './PQPopUp';
import * as React from 'react';

// display current preferences at the bottom of the page
export default class Preferences extends React.Component {
  // determines if either state has been seen
  state = {
    pqSeen: false,
    mrSeen: false
  };

  // methods to toggle pop ups
  togglePQ = () => {
    this.setState({
      pqSeen: !this.state.pqSeen
    });

  };

  toggleMR = () => {
    this.setState({
      mrSeen : !this.state.mrSeen
    });
  };

  render() {
    return (
      <>
        <ResponsiveAppBar />
        <Box position="static">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ ml: "15px", mt: "10px", display: { xs: 'none', md: 'flex' } }}
          >
            Saved Preferences
          </Typography>
          <Button 
          onClick={this.togglePQ}
          sx={{ ml: "15px", mt: "10px", display: { xs: 'none', md: 'flex' } }}
          >
            Rapid Preferences Quiz
            </Button>
          {this.state.pqSeen ? <PQPopUp toggle={this.togglePQ} /> : null}
          
        </Box>
        
      </>
    );
  }
}
