import ResponsiveAppBar from '../ResponsiveAppBar/index'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MSPopUp from './MovieSelectionPopUp';
import MPopUp from './SelectedMoviePopUp';
import MembersPop from './MembersPopUp';
import * as React from 'react';
import PPopUp from './EditPreferences.js';
import PreferencesStats from './GroupPrefStat';
import GroupMembers from './GroupMemberIcons';
import Axios from 'axios';
import { selectMovie } from "./SelectionAlgo.js";
import ReturnButton from './ReturnButton';


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
    showMasterButtons: false,
    msSeen: false,
    mSeen: false,
    membersSeen: false,
    pSeen: false,
    movieMaster: "",
    roomCode: window.location.href.split('/')[4], // get the movie room from url

    chart: true,
    members: [],
    member_images: [],
    // state variables for the selection algo, 50% defaut

    l_pref: 0.5,
    r_pref: 0.5,
    g_pref: 0.5,
    ry_pref: 0.5,
    a_pref: 0.5,
    movie_list: [],
    url_check: true,

    alert_img: "",
    alert_title: "",
  };


  async componentDidMount() { //ONLOAD
    const code = this.state.roomCode;
    // get movie master
    this.CheckCode();
    const currUser = JSON.parse(localStorage.getItem('user'));
    Axios.get('http://localhost:3001/getMovieMaster', {
      params: { c: code }
    }
    ).then((response) => {
      // console.log("movie master is: " + response.data[0].username);
      this.setState({
        movieMaster: response.data[0].username,
      })
      // toggle for master vs general user ui
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

    // get the member profile photos
    const mem_img = await this.fetchImages(group_members);
    const member_profiles = [];
    for (const i in mem_img) {
      member_profiles.push(mem_img[i]);
    }

    this.setState({
      members: group_members,
      member_images: member_profiles,
    });

    //check if there is an alert for the currUser
    Axios.get('http://localhost:3001/checkAlert', {
      params: { code: code, user: currUser }
    }).then((response) => {
      console.log(response.data[0].cnt === '0');
      if (response.data[0].cnt !== '0') {
        Axios.get('http://localhost:3001/getAlert', {
          params: { code: code, user: currUser }
        }).then((response) => {
          if (response.data.length !== 0) {

            this.setState({
              alert_img: response.data[0].image_path,
              alert_title: response.data[0].title
            });
            this.toggleMSAlert();
          }
          console.log(response);
        }).catch(err => {
          console.log(err);
        })
      }
    }).catch(err => {
      console.log(err);
    });

    Axios.get('http://localhost:3001/checkSelectionAlert', {
      params: { code: code, user: currUser }
    }).then((response) => {
      // console.log(response.data[0].cnt === '0');
      if (response.data[0].cnt !== '0') {
        Axios.get('http://localhost:3001/getSelectionAlert', {
          params: { code: code, user: currUser }
        }).then((response) => {
          if (response.data.length !== 0) {

            this.setState({
              alert_img: response.data[0].image_path,
              alert_title: response.data[0].title
            });
            this.toggleMAlert();
          }
          console.log(response);
        }).catch(err => {
          console.log(err);
        })
      }
    }).catch(err => {
      console.log(err);
    });

    this.render();
  }

  CheckCode = () => {
    let code = window.location.href.split('/')[4];
    //Check if url code exists in db
    Axios.get('http://localhost:3001/checkMovieRoomCode', {
      params: { c: code }
    }
    ).then((response) => {
      console.log("movie room exists -> code is " + response.data[0].code);

    }).catch(err => {
      console.log("movie room doesnt exist");
      //load alert saying you dont have access to this room
      this.setState({
        url_check: false,
      })
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

  // get the list of images
  fetchImages = async (mems) => {
    var images = [];
    try {
      for (const m in mems) {
        // store the user in local storage
        const response = await Axios.get('http://localhost:3001/getProfile', {
          params: { name: mems[m] }
        });

        images.push(response.data[0].image_path);
      }
      return images;
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
    this.toggleMS(null);
    var big_pref_list = [];
    const group_members = this.state.members;

    //console.log("group members", group_members);
    const tables =
      ["genre_pref", "rating_pref", "length_pref", "actor_pref", "start_year_pref", "end_year_pref"];
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

    // console.log("group prefs: ", big_pref_list);

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
    // console.log("movie master prefs: ", mm_pref_list);

    // calls the selectMovie function in the SelectionAlgo class
    const movie = await selectMovie(this.state.l_pref, this.state.r_pref, this.state.g_pref
      , this.state.ry_pref, this.state.a_pref, big_pref_list, mm_pref_list);

    // show the movie selection pop up
    this.toggleMS(null);
    this.toggleMS(movie);
  }

  toggleMSAlert = () => {
    this.setState({
      msSeen: !this.state.msSeen
    });
  };

  toggleMAlert = () => {
    this.setState({
      mSeen: !this.state.mSeen
    });
  };

  // methods to toggle pop ups
  toggleMS = (movie) => {
    this.setState({
      movie_list: movie,
      msSeen: !this.state.msSeen,
      chart: this.state.msSeen
    });
  };

  onClick = () => {
    this.setSelection();
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
    // console.log("set " + name + " to: " + val / 100);
  }

  render() {
    const curr_user = JSON.parse(localStorage.getItem('user'));
    var show = this.state.showMasterButtons;
    const check = this.state.url_check;
    console.log("url check in render: ", check);
    return (
      <>
        <ResponsiveAppBar currentUser={curr_user} />

        {check ? <Box position="static">

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

          {this.state.msSeen ? <MSPopUp selectList={this.state.movie_list} alertImg={this.state.alert_img} alertTitle={this.state.alert_title} mem={this.state.members} master={this.state.movieMaster} toggle={this.toggleMS} /> : null}
          {this.state.mSeen ? <MPopUp selectList={this.state.movie_list} alertImg={this.state.alert_img} alertTitle={this.state.alert_title} mem={this.state.members} master={this.state.movieMaster} toggle={this.toggleMAlert} /> : null}
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

          <GroupMembers mem={this.state.members} code={this.state.roomCode} images={this.state.member_images}

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
            className='center-screen' /> : null}
        </Box> : <ReturnButton />
        }
      </>
    );
  }
}
