import ResponsiveAppBar from '../ResponsiveAppBar/index'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PQPopUp from './MovieSelectionPopUp';
import GPPopUp from './GroupPrefPopUp';
import * as React from 'react';
import {componentDidMount} from 'react';
import PreferencesStats from './GroupPrefStat';
import GroupMembers from './GroupMemberIcons';
import Axios from 'axios';

// styling for horizontal list
const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
};

/*function getMovieMaster(){
  Axios.post('http://localhost:3001/getMaster', {
            code: roomCode
        }).then((response) => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
}*/

// display current preferences at the bottom of the page
export default class MovieRoom extends React.Component {
  // determines if either state has been seen
  state = {
    pqSeen: false,
    gpSeen: false,
    movieMaster: "",
    roomCode: "123456",
  };

  componentDidMount(){
    const c = this.state.roomCode;
    console.log(c);
    Axios.post('http://localhost:3001/getMaster', {
            code: c
        }).then((response) => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
  }

  // methods to toggle pop ups
  togglePQ = () => {
    this.setState({
      pqSeen: !this.state.pqSeen
    });

  };

  toggleGP = () => {
    this.setState({
      gpSeen: !this.state.gpSeen
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
            Copy Link
          </Button>
          {this.state.pqSeen ? <PQPopUp toggle={this.togglePQ} /> : null}

          {/* generate selection button */}
          <Button
            onClick={this.togglePQ}
            sx={{ ml: "15px", mt: "40px", position: 'absolute', right: 50 }}
          >
            Generate Movie Selection
          </Button>
          {this.state.pqSeen ? <PQPopUp toggle={this.togglePQ} /> : null}

          <Button
            onClick={this.toggleGP}
            sx={{ ml: "15px", mt: "70px", position: 'absolute', right: 50 }}
          >
            Edit Group Preferences
          </Button>
          {this.state.gpSeen ? <GPPopUp toggle={this.toggleGP} /> : null}

          <Typography
            
            variant="h6"
            noWrap
            component="div"
            sx={{ ml: "15px", mt: "20px", display: { xs: 'none', md: 'flex' } }}
          >
            Movie Master: Mehdi
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

          <GroupMembers style={flexContainer} class='center-screen'/>

          {/* saved preferences section */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ ml: "15px", mt: "20px", display: { xs: 'none', md: 'flex' } }}
          >
            Group Preferences
          </Typography>

          <PreferencesStats style={flexContainer} class='center-screen'/>

        </Box>

      </>
    );
  }
}