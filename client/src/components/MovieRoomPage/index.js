import ResponsiveAppBar from '../ResponsiveAppBar/index'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PQPopUp from './MovieSelectionPopUp';
import GPPopUp from './GroupPrefPopUp';
import * as React from 'react';
import { componentDidMount } from 'react';
import PPopUp from './EditPreferences.js';
import PreferencesStats from './GroupPrefStat';
import GroupMembers from './GroupMemberIcons';
import Axios from 'axios';

// styling for horizontal list
const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
};


// display current preferences at the bottom of the page
export default class MovieRoom extends React.Component {
  // determines if either state has been seen
  state = {
    pqSeen: false,
    gpSeen: false,
    pSeen: false,
    movieMaster: "",
    roomCode: "123456", // get this from wherever needed
    chart: true,
  };

  componentDidMount() {
    const code = this.state.roomCode;
    console.log(code);
    Axios.get('http://localhost:3001/getMovieMaster', {
      params: { c: code }
    }
    ).then((response) => {
      console.log("movie master is: " + response.data[0].username);
      this.setState({
        movieMaster: response.data[0].username,
      })
    }).catch(err => {
      console.log(err);
    });
  }

  // methods to toggle pop ups
  togglePQ = () => {
    this.setState({
      pqSeen: !this.state.pqSeen,
      chart: this.state.pqSeen
    });

  };

  toggleGP = () => {
    this.setState({
      gpSeen: !this.state.gpSeen,
      chart: this.state.gpSeen
    });
  };
  toggleP = () => {
    this.setState({
      pSeen: !this.state.pSeen,
      chart: this.state.pSeen
    });
  };

  copyToClipboard = () => {
    var inputc = document.body.appendChild(document.createElement("input"))
    inputc.value = window.location.href
    inputc.setAttribute('readonly', '')
    inputc.select()
    document.execCommand('copy')
    document.body.removeChild(inputc)

  }


  render() {
    return (
      <>
        <ResponsiveAppBar />

        <Box position="static">
          {/* generate copy link button */}
          <Button
            onClick={this.copyToClipboard}
            sx={{ ml: "15px", mt: "10px", position: 'absolute', right: 50 }}
          >
            Copy Room Link
          </Button>
          {/* generate selection button */}
          <Button
            onClick={this.togglePQ}
            sx={{ ml: "15px", mt: "40px", position: 'absolute', right: 50 }}
          >
            Generate Selection
          </Button>
          {this.state.pqSeen ? <PQPopUp toggle={this.togglePQ} /> : null}

          <Button
            onClick={this.toggleGP}
            sx={{ ml: "15px", mt: "70px", position: 'absolute', right: 50 }}
          >
            Edit Group Preferences
          </Button>
          <Button
            onClick={this.toggleP}
            sx={{ ml: "15px", mt: "100px", position: 'absolute', right: 50 }}
          >
            Edit Preferences
          </Button>
          {this.state.gpSeen ? <GPPopUp toggle={this.toggleGP} /> : null}
          {this.state.pqSeen ? <PQPopUp toggle={this.togglePQ} /> : null}
          {this.state.pSeen ? <PPopUp toggle={this.toggleP} /> : null}

          <Typography

            variant="h6"
            noWrap
            component="div"
            sx={{ ml: "15px", mt: "20px", display: { xs: 'none', md: 'flex' } }}
          >
            Movie Master: {this.state.movieMaster}
          </Typography>

          {/* group member icons section */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ ml: "15px", mt: "20px", display: { xs: 'none', md: 'flex' } }}
          >
            Group Members
          </Typography>

          <GroupMembers style={flexContainer} class='center-screen' />

          {/* saved preferences section */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ ml: "15px", mt: "20px", display: { xs: 'none', md: 'flex' } }}
          >
            Group Preferences
          </Typography>

          {this.state.chart ? <PreferencesStats style={flexContainer} class='center-screen' /> : null}

        </Box>

      </>
    );
  }
}