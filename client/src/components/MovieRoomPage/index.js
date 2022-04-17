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

var movieImgPath = "";
var roomMaster = "";
var rCode = "";

// display current preferences at the bottom of the page
export default class MovieRoom extends React.Component {
  // determines if either state has been seen
  state = {
    pqSeen: false,
    gpSeen: false,
    showMasterButtons: false,
    movieMaster: "",
    roomCode: "123456",
  };

  componentDidMount(){
    const c = this.state.roomCode;
    rCode = c;
    console.log(c);
    //get movie master
    Axios.get('http://localhost:3001/getMaster', {
            params: {code: c}
        }).then((response) => {
            const master = response.data[0].movie_master;
            console.log("Master: " + master);
            this.setState({movieMaster: master});
            roomMaster = master;
            const currUser = JSON.parse(localStorage.getItem('user'));
            console.log("user: " + currUser);
            if (currUser == master){
              this.setState({showMasterButtons: true});
            }
        }).catch(err => {
            console.log(err);
        });

    //check if a new selection has been inserted in database
    Axios.get('http://localhost:3001/getSelection', {
            params: {code: c}
        }).then((response) => {
          if (response.data.length > 0){
            movieImgPath = response.data[0].image_path;
            this.togglePQ();
          }
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

  onClick = () => {
    //this.togglePQ();
    this.setSelection();
  };

  setSelection = () => {
    //insert selection into database 
    const c = this.state.roomCode;
    const t = "The Avengers";
    const y = 2012;
    const img = "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg";
    console.log("params: " + c + " " + t + " " + y);
    Axios.post('http://localhost:3001/movieSelection', {
            code: c, title: t, year: y, imagePath: img
        }).then((response) => {
            movieImgPath = img;
            this.togglePQ();
            console.log(response);
        }).catch(err => {
            console.log(err);
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
    var currentMaster = this.state.movieMaster;
    var show = this.state.showMasterButtons;
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
          {show && <Button
            onClick={this.onClick}
            sx={{ ml: "15px", mt: "40px", position: 'absolute', right: 50 }}
          >
            Generate Movie Selection
          </Button>}
          {this.state.pqSeen ? <PQPopUp toggle={this.togglePQ} /> : null}
          

          {show && <Button
            onClick={this.toggleGP}
            sx={{ ml: "15px", mt: "70px", position: 'absolute', right: 50 }}
          >
            Edit Group Preferences
          </Button>}
          {this.state.gpSeen ? <GPPopUp toggle={this.toggleGP} /> : null}

          <Typography
            
            variant="h6"
            noWrap
            component="div"
            sx={{ ml: "15px", mt: "20px", display: { xs: 'none', md: 'flex' } }}
          >
            Movie Master: {currentMaster}
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
export {movieImgPath};
export {roomMaster};
export {rCode};