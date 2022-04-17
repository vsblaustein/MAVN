import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MultipleGenreSelect from './MultipleGenreSelect';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PQPopUp.css';

// pop up for individual genre preferences

export default function Genre(props) {

  const [genre, setGenre] = React.useState([]);

  let navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));


  const handleExit = () => {
    props.toggle();
  };

  const setValue = (g) => {
    setGenre(g);
  };

  // submits query to database with information from form
  const handleSubmit = async (event) => {
    console.log("submit genre pref for " + currentUser);
    event.preventDefault();
    for (const g in genre) {
      console.log("current genre: " + genre[g]);
      Axios.post('http://localhost:3001/genrePref', {
        username: currentUser,
        genre: genre[g],
      }).then((response) => {
        console.log(response);
        navigate("/my%20preferences", { replace: true });
      }).catch(err => {
        console.log(err);
      });
    }
    document.location.reload();
    handleExit();
  }

  return (
    <>
      <Box className="modal">
        <Box className="mini_pref_modal">
          <span className="close" onClick={handleExit}>
            <Button>
              Exit
            </Button>
          </span>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ m: "3px", display: { xs: 'none', md: 'flex' } }}>
              Add Genre Preferences
            </Typography>
            <label > What genres are you feeling? </label><br />
            <MultipleGenreSelect action={setValue} toggle={handleExit} />
            <Button type="submit" sx={{ mt: '10px' }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}