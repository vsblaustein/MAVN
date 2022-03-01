import ResponsiveAppBar from '../ResponsiveAppBar/index'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PQPopUp from './PQPopUp';
import * as React from 'react';
import MovieReview from './MovieReview';
import PreferencesStats from './PreferenceStat';


// styling for horizontal list
const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
};

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
      mrSeen: !this.state.mrSeen
    });
  };


  render() {
    return (
      <>
        <ResponsiveAppBar />
        <Box position="static">
          {/* preference quiz button */}
          <Button
            onClick={this.togglePQ}
            sx={{ ml: "15px", mt: "10px", position: 'absolute', right: 200 }}
          >
            Take Preferences Quiz
          </Button>
          {this.state.pqSeen ? <PQPopUp toggle={this.togglePQ} /> : null}

          {/* movie search button */}
          <Button
            onClick={this.toggleMR}
            sx={{ right: 10, mt: "10px", position: 'absolute' }}
          >
            Rapid Movie Review
          </Button>
          {this.state.mrSeen ? <MovieReview toggle={this.toggleMR} /> : null}

          {/* saved preferences section */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ ml: "15px", mt: "20px", display: { xs: 'none', md: 'flex' } }}
          >
            My Current Preferences
          </Typography>

          <PreferencesStats style={flexContainer} class='center-screen'/>

        </Box>

      </>
    );
  }
}