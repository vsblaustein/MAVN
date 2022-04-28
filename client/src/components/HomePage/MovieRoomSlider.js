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

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    //get movie rooms
    Axios.get('http://localhost:3001/getMovieRooms', {
      params: { name: currentUser }
    }).then((response) => {// gives a list of json objects

      //go through every code
      for (let i = 0; i < response.data.length; i++) {
        this.setState(prevState => ({
          roomCodes: [...prevState.roomCodes, response.data[i].code]
        }))

        const tempCode = response.data[i].code;

        //get the name based on the code of a movie room
        Axios.get('http://localhost:3001/getMovieRoomName', {
          params: { code: tempCode }
        }).then((response) => {

          this.setState(prevState => ({
            roomNames: [...prevState.roomNames, response.data[0].name]
          }))

        }).catch(err => {
          console.log(err);
        });
      }
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
                    .map((roomNames, index) =>
                      <ListItemButton key={this.state.roomCodes[index]}>
                        <Link to={`/movie%20room/${this.state.roomCodes[index]}`}>{roomNames}
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


