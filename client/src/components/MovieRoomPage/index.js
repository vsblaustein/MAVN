import ResponsiveAppBar from '../ResponsiveAppBar/index'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PQPopUp from './MovieSelectionPopUp';
import * as React from 'react';
import PreferencesStats from './GroupPrefStat';
import GroupMembers from './GroupMemberIcons';

const express = require("express");
const cors = require("cors");
const PORT = 3001;
const app = express();
app.use(express.json());
app.use(cors());
const mariadb = require('mariadb');

var movieMaster = ''
var roomCode = ''

var db = mariadb.createPool({
     host: '172.16.122.22',
     port: 3306,
     user: 'nate2',
     password: 'nate2',
     database: 'moviemaster'
    
});

module.exports = Object.freeze({
  pool: db
});

//POST: register request
app.post('/movie_master', async (req, res) => {
  try {
    const result = await db.query(
      "SELECT movie_master FROM movie_room WHERE code = ?", [roomCode]
      );
    res.send(req.body);
  } catch (err) {
    throw err;
  }
});

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