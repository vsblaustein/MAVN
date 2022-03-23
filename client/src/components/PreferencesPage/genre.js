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

  const handleExit = () => {
    props.toggle();
  };

  const setValue = (g) => {
    setGenre(g);
  };

  const handleSubmit = async(event) => {
    console.log("submit quiz");
    event.preventDefault();
    // write info to the database and continue
    for(const g in genre){
      console.log("current genre: " + genre[g]);
      Axios.post('http://localhost:3001/genrePref', {
      username: 'smolnate',
      genre: genre[g],
    }).then((response) => {
      console.log(response);
      navigate("/my%20preferences", { replace: true });
    }).catch(err => {
      console.log(err);
    });
    }
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
          {/* may need to define an action */}
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mt: "5px", display: { xs: 'none', md: 'flex' } }}
            >
              Add Genre Preferences
            </Typography>
            <label> What genres are you feeling? </label><br />
            <MultipleGenreSelect action={setValue} toggle={handleExit} />
            <Button type="submit">
              Submit
            </Button>
          </Box >
        </Box>
      </Box>
    </>
  );
}