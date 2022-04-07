import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MultipleActorSelect from './MultipleActorSelect';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PQPopUp.css';

// pop up for individual genre preferences

export default function Actors(props) {

  const [actors, setActors] = React.useState([]);

  let navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const handleExit = () => {
    props.toggle();
  };

  const setValues = (a) => {
    setActors(a);
  };

  // submits query to database with information from form
  const handleSubmit = async (event) => {
    console.log("submit actors pref for " + currentUser);
    event.preventDefault();
    for (const a in actors) {
      console.log("current actor: " + actors[a]);
      Axios.post('http://localhost:3001/actorPref', {
        username: currentUser,
        actors: actors[a],
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
        <Box className="modal-content">
          <span className="close" onClick={handleExit}>
            <Button>
              Exit
            </Button>
          </span>

          {/* may need to define an action */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mt: "5px", display: { xs: 'none', md: 'flex' } }}
            >
              Add Actor Preferences
            </Typography>
            <label> Who should you see on the big screen? </label><br />
            <MultipleActorSelect action={setValues} toggle={handleExit} />
            <Button type="submit" sx={{mt:'10px'}}> 
            Submit 
            </Button>

          </Box >
        </Box>
      </Box>
    </>
  );
}