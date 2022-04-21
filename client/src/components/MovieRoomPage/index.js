import ResponsiveAppBar from '../ResponsiveAppBar/index'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MSPopUp from './MovieSelectionPopUp';
import MembersPop from './MembersPopUp';
import * as React from 'react';
import PPopUp from './EditPreferences.js';
import PreferencesStats from './GroupPrefStat';
import GroupMembers from './GroupMemberIcons';
import Axios from 'axios';
import { selectMovie } from "./SelectionAlgo.js";
import { useNavigate } from 'react-router';
import ReturnButton from './ReturnButton';


// styling for horizontal list
const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
};


var roomMaster = "";
var rCode = "";
var movieImgPath = "";

// display current preferences at the bottom of the page
export default class MovieRoom extends React.Component {
  // determines if either state has been seen
  state = {
    pqSeen: false,
    gpSeen: false,
    showMasterButtons: false,
    msSeen: false,
    membersSeen: false,
    pSeen: false,
    movieMaster: "",
    roomCode: window.location.href.split('/')[4], // get the movie room from url
    chart: true,
    members: [],
    // state variables for the selection algo, 50% defaut

    l_pref: 0.5,
    r_pref: 0.5,
    g_pref: 0.5,
    ry_pref: 0.5,
    a_pref: 0.5,
    movie_list: [],
    url_check: true
  };


  async componentDidMount() { //ONLOAD

    const code = this.state.roomCode;
    console.log(code);
    // get movie master
    this.CheckCode();
    Axios.get('http://localhost:3001/getMovieMaster', {
      params: { c: code }
    }
    ).then((response) => {
      console.log("movie master is: " + response.data[0].username);
      this.setState({
        movieMaster: response.data[0].username,
      })
      console.log("Master: " + this.state.movieMaster);
      roomMaster = this.state.movieMaster;
      const currUser = JSON.parse(localStorage.getItem('user'));
      console.log("user: " + currUser);
      if (currUser === this.state.movieMaster) {
        this.setState({ showMasterButtons: true });
      }
    }).catch(err => {
      console.log(err);
    });

    // get the group members to pass to member icons
    const gm = await this.fetchMembers();
    const group_members = [];
    // get a list of group_member usernames
    for (const curr_gm in gm) {
      group_members.push(gm[curr_gm].username);
    }

    this.setState({
      members: group_members,
    });

    //check if a new selection has been inserted in database
    Axios.get('http://localhost:3001/getSelection', {
      params: { code: code }
    }).then((response) => {
      if (response.data.length > 0) {
        movieImgPath = response.data[0].image_path;
        this.togglePQ();
      }
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
    this.render();
  }

  CheckCode = () => {
    let code = window.location.href.substring(35);
    console.log("code is " + code);
    //Check if url code exists in db
    Axios.get('http://localhost:3001/checkMovieRoomCode', {
      params: { c: code }
    }
    ).then((response) => {
      console.log("movie room exists -> code is " + response.data[0].code);

    }).catch(err => {
      console.log("movie room doesnt exist");
      //load alert saying you dont have access to this room
      //MyFunction();
      this.state.url_check = false;
      console.log("url check after CheckCode catch: ", this.state.url_check);
      this.forceUpdate();
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
    const group_members = this.state.members;

    //console.log("group members", group_members);
    const tables = ["genre_pref", "rating_pref", "length_pref", "actor_pref", "start_year_pref", "end_year_pref"];
    //iterate over every table and store them in a list.
    //current user is member.username
    console.log("members:" + group_members);

    //create a big json that stores all the current user's preferences

    for (var table of tables) {
      //console.log(`getting table ${table} from user ${member.username}`);
      const data = await this.fetchGroupPrefs(group_members, table);
      //console.log("fetchGroupPrefs returns ", data);
      var json = JSON.parse(
        JSON.stringify(
          {
            table: table,
            data: data,
          }
        ));
      big_pref_list.push(json);
    }

    console.log("group prefs: ", big_pref_list);

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
    const movie = await selectMovie(this.state.l_pref, this.state.r_pref, this.state.g_pref
      , this.state.ry_pref, this.state.a_pref, big_pref_list, mm_pref_list);

    // set the movie list state variable to use in selection

    this.toggleMS(movie);

  }

  // methods to toggle pop ups
  toggleMS = (movie) => {
    this.setState({
      movie_list: movie,
      msSeen: !this.state.msSeen,
      chart: this.state.msSeen
    });
  };

  onClick = () => {
    //this.togglePQ();
    this.setSelection();
  };

  // may not need this - double check
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

  toggleMembers = () => {
    this.setState({
      membersSeen: !this.state.membersSeen,
      chart: this.state.membersSeen
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
        l_pref: val / 100,
      });
    }
    else if (name === 'r_pref') {
      this.setState({
        r_pref: val / 100,
      });
    }
    else if (name === 'g_pref') {
      this.setState({
        g_pref: val / 100,
      });
    }
    else if (name === 'ry_pref') {
      this.setState({
        ry_pref: val / 100,
      });
    }
    else if (name === 'a_pref') {
      this.setState({
        a_pref: val / 100,
      });
    }
    else {
      console.log("Cannot find preference rating trying to update");
    }
    console.log("set " + name + " to: " + val / 100);
  }

  render() {
    var currentMaster = this.state.movieMaster;
    var show = this.state.showMasterButtons;
    const check = this.state.url_check;
    console.log("url check in render: ", check);
    return (
      <>
        <ResponsiveAppBar />
          {check
            ? <Box position="static">

          {/* generate selection button */}
          {show && <Button
            onClick={this.generateSelection}
            sx={{ ml: "15px", mt: "40px", position: 'absolute', right: 50 }}
          >
            Generate Selection
          </Button>}
          {show && <Button
            onClick={this.toggleP}
            sx={{ ml: "15px", mt: "100px", position: 'absolute', right: 50 }}
          >
            Bias Movie Selection
          </Button>}
          <Button
            onClick={this.copyToClipboard}
            sx={{ ml: "15px", mt: "10px", position: 'absolute', right: 50 }}
          >
            Copy Room Link
          </Button>

          {show && <Button
            onClick={this.toggleMembers}
            sx={{ ml: "15px", mt: "70px", position: 'absolute', right: 50 }}
          >
            Remove Group Members
          </Button>}

          {/* generate selection button
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
          {show && <Button
            onClick={this.generateSelection}
            sx={{ ml: "15px", mt: "40px", position: 'absolute', right: 50 }}
          >
            Generate Selection
          </Button> }
          <Button
            onClick={this.toggleP}
            sx={{ ml: "15px", mt: "100px", position: 'absolute', right: 50 }}
          >
            Bias Movie Selection
          </Button>
          <Button
            onClick={this.copyToClipboard}
            sx={{ ml: "15px", mt: "10px", position: 'absolute', right: 50 }}
          >
            Copy Room Link
          </Button> */}

          {/* <Button
            onClick={this.toggleMembers}
            sx={{ ml: "15px", mt: "70px", position: 'absolute', right: 50 }}
          >
            Remove Group Members
          </Button> */}


          {this.state.msSeen ? <MSPopUp selectList={this.state.movie_list} toggle={this.toggleMS} /> : null}
          {this.state.pSeen ? <PPopUp update={this.setValues} toggle={this.toggleP} /> : null}
          {this.state.membersSeen ? <MembersPop code={this.state.roomCode}
            mem={this.state.members} master={this.state.movieMaster} toggle={this.toggleMembers} /> : null}

          <Typography

            variant="h6"
            noWrap
            component="div"
            sx={{ ml: "15px", mt: "20px", display: { xs: 'none', md: 'flex' } }}
          >

            Room {this.state.roomCode} Movie Master: {this.state.movieMaster}

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

          <GroupMembers mem={this.state.members} code={this.state.roomCode}
            style={flexContainer} class='center-screen' />

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
        : <ReturnButton />
        }
      </>
    );
  }
}

export { movieImgPath };
export { roomMaster };
export { rCode };
