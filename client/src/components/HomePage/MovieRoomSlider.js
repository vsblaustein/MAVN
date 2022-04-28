import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Axios from 'axios';
import { ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';

// display the movie rooms the user is part of
export default class MovieRoomSlider extends React.Component {

  state = {
    roomCodes: [],
    roomNames: []
  }

  async componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    // get movie rooms and codes
    await Axios.get('http://localhost:3001/getCodeAndName', {
      params: { name: currentUser }
    }).then((response) => {// gives a list of json objects
      console.log(response);
      console.log(response.data);
      var roomCodes = [];
      var roomNames =[];
      for(const d in response.data){
        roomCodes.push(response.data[d].code);
        roomNames.push(response.data[d].name);
      }

      this.setState({
        roomCodes: roomCodes,
        roomNames:roomNames,
      })
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <>
        <Box>
          <Box sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <>
              <Typography component="h1" variant="h3">Movie Rooms</Typography>
              <ul>
                {
                  this.state.roomNames
                    .map((roomName, index) =>
                      <ListItemButton key={this.state.roomCodes[index]}>
                        <Link to={`/movie%20room/${this.state.roomCodes[index]}`}>{roomName}
                        </Link>
                      </ListItemButton>
                    )
                }
              </ul>
            </>
          </Box>
        </Box>
      </>
    );
  }
}


