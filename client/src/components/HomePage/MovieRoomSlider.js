import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Axios from 'axios';
import { ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';

// this document will generate the charts from the db and display them

export default class MovieRoomSlider extends React.Component {

  state = {
    roomNames: []
  }


  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    //get movie rooms
    Axios.get('http://localhost:3001/getMovieRooms', {
      params: { name: currentUser }
    }).then((response) => {// gives a list of json objects
      for (let i = 0; i < response.data.length; i++) {
        //console.log(response.data[i].code);
        this.setState(prevState => ({
          roomNames: [...prevState.roomNames, response.data[i].code]
        }))
      }
      //console.log(roomNames);
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <>
        <div>

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
                    .map(room =>
                      <ListItemButton key={room.id}>
                        <Link to={`/movie%20room/${room}`}>{room}
                        </Link>

                      </ListItemButton>
                    )
                }
              </ul>
            </>

          </Box>
        </div>
      </>
    );
  }
}


