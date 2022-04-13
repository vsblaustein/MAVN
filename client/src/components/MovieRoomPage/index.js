import ResponsiveAppBar from '../ResponsiveAppBar/index'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MSPopUp from './MovieSelectionPopUp';
import GPPopUp from './GroupPrefPopUp';
import * as React from 'react';
import { componentDidMount } from 'react';
import PPopUp from './EditPreferences.js';
import PreferencesStats from './GroupPrefStat';
import GroupMembers from './GroupMemberIcons';
import Axios from 'axios';
import { selectMovie } from "./SelectionAlgo.js";



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
    msSeen: false,
    gpSeen: false,
    pSeen: false,
    movieMaster: "",
    roomCode: "123456", // get this from wherever needed
    chart: true,
    // state variables for the selection algo, 50% defaut
    l_pref: 50,
    r_pref: 50,
    g_pref: 50,
    ry_pref: 50,
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

  //get all members in room

  fetchMembers = async () => {
    //console.log("fetching members of group");
    try {
      const resp = await Axios.get('http://localhost:3001/getMembersList', {
        params: { room_code: this.state.roomCode }
      });
      //console.log("member list", resp.data);
      return resp.data;
    } catch (err) {
      console.log(err);
    }
  }

  //get group prefs for all members in room
  fetchGroupPrefs = async (user, table) => {
    try {
      const resp = await Axios.get('http://localhost:3001/getGroupPrefChart', {
        params: { username: user, table: table }
      });
      //console.log("fetch group prefs returned", resp.data);
      return resp.data;
    } catch (err) {
      console.error(err);
    }
  }

  //get moviemaster prefs
  fetchMovieMasterPrefs = async (table) => {
    try {
      const resp = await Axios.get('http://localhost:3001/getPrefChart', {
        params: { username: this.state.movieMaster, table: table }
      });
      //console.log("fetch group prefs returned", resp.data);
      return resp.data;
    } catch (err) {
      console.error(err);
    }
  }

  // pass in the values stored as state variables to compute
  generateSelection = async (prefs) => {
    //step 1: select all movies from db given the genre and rating (and sliders ofc)
    var big_pref_list = [];
    const group_members = await this.fetchMembers();
    //console.log("group members", group_members);
    const tables = ["genre_pref", "rating_pref", "length_pref", "actor_pref", "start_year_pref", "end_year_pref"];
    //iterate over every table and store them in a list.
    for (var member of group_members) {
      //current user is member.username
      //create a big json that stores all the current user's preferences
      var user_prefs = [];
      for (var table of tables) {
        //console.log(`getting table ${table} from user ${member.username}`);
        const data = await this.fetchGroupPrefs(member.username, table);
        //console.log("fetchGroupPrefs returns ", data);
        var json = JSON.parse(
          JSON.stringify(
            {
              table: table,
              data: data,
            }
          ));
        user_prefs.push(json);
      }
      console.log(`user prefs for user ${member.username}`, user_prefs);
      //create another json to push to bigpreflist
      var json = JSON.parse(
        JSON.stringify(
          {
            user: member.username,
            prefs: user_prefs
          }
        ));
      big_pref_list.push(json);
    }
    //console.log("big-pref-list", big_pref_list);
    var mm_pref_list = [];
    for (var table of tables) {
      //console.log(`getting table ${table} from user ${member.username}`);
      const data = await this.fetchMovieMasterPrefs(table);
      var json = JSON.parse(
        JSON.stringify(
          {
            table: table,
            data: data,
          }
        ));
      mm_pref_list.push(json);
    }
    console.log("movie master prefs: ", mm_pref_list);
    //big pref list holds everyones shit
    //mm_pref_list holds only movie masters shit


    // calls the selectMovie function in the SelectionAlgo class
    const movie = await selectMovie();
    this.toggleMS();

  }

  // methods to toggle pop ups
  toggleMS = () => {
    this.setState({
      msSeen: !this.state.msSeen,
      chart: this.state.msSeen
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

  // changes value in edit preference pop up
  setValues = (name, val) => {
    if (name === 'l_pref') {
      this.setState({
        l_pref: val,
      });
    }
    else if (name === 'r_pref') {
      this.setState({
        r_pref: val,
      });
    }
    else if (name === 'g_pref') {
      this.setState({
        g_pref: val,
      });
    }
    else if (name === 'ry_pref') {
      this.setState({
        ry_pref: val,
      });
    }
    else {
      console.log("Cannot find preference rating trying to update");
    }
    console.log("set " + name + " to: " + val);
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
            onClick={this.generateSelection}
            sx={{ ml: "15px", mt: "40px", position: 'absolute', right: 50 }}
          >
            Generate Selection
          </Button>
          {this.state.msSeen ? <MSPopUp toggle={this.toggleMS} /> : null}

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
          {this.state.msSeen ? <MSPopUp toggle={this.toggleMS} /> : null}
          {this.state.pSeen ? <PPopUp update={this.setValues} toggle={this.toggleP} /> : null}

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

          {this.state.chart ? <PreferencesStats
            code={this.state.roomCode} style={flexContainer}
            class='center-screen' /> : null}

        </Box>

      </>
    );
  }
}