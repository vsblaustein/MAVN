import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import RangeSlider from './RangeSlider';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PQPopUp.css';

// pop up for individual genre preferences

export default function ReleaseYear(props) {

  const [s_year, setSYear] = React.useState(1960);
  const [e_year, setEYear] = React.useState(2000);

  let navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const handleExit = () => {
    props.toggle();
  };

  const handleSubmit = async (event) => {
    console.log("passing to db: " + s_year + " : " + e_year);
    event.preventDefault();
    // write this.state.value to the database
    console.log('submit rating pref for ' + currentUser);
    Axios.post('http://localhost:3001/releaseYearPref', {
      username: currentUser,
      s_year: s_year,
      e_year: e_year,
    }).then((response) => {
      console.log(response);
      navigate("/my%20preferences", { replace: true });
    }).catch(err => {
      console.log(err);
    });
    handleExit();
    // write info to the database and continue
  };

  const setValues = (start, end) => {
    setSYear(start);
    setEYear(end);
    console.log(s_year + " : " + e_year);
  };

  return (
    <>
      <Box className="modal">
        <Box className="mini_slide_pref_modal">
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
              Add Release Year Preferences
            </Typography>
            <Box mt='10px'>
              <label> Preferred Movie Release Year </label><br /><br />
              <Box width='80%' ml='30px'>
                <RangeSlider action={setValues} />
              </Box>
            </Box>

            <Button type="submit">
              Submit
            </Button>
          </Box >
        </Box>
      </Box>
    </>
  );
}