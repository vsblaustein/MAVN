import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Slider } from '@mui/material';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PQPopUp.css';


// pop up for individual rating preferences
const rating = [{ value: 0, label: '0%' }, { value: 20, label: '20%' },
{ value: 40, label: '40%' }, { value: 60, label: '60%' },
{ value: 80, label: '80%' }, { value: 100, label: '100%' }];


export default function Rating(props) {
  const [value, setValue] = React.useState(75);

  const handleExit = () => {
    props.toggle();
  };

  let navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  // submits query to database with information from form
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('submit rating pref for ' + currentUser);
    Axios.post('http://localhost:3001/ratingPref', {
      username: currentUser,
      rating: value,
    }).then((response) => {
      console.log(response);
      navigate("/my%20preferences", { replace: true });
    }).catch(err => {
      console.log(err);
    });
    document.location.reload();
    handleExit();
  };

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <>
      <Box className="modal" >
        <Box className="mini_slide_pref_modal">
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
              sx={{ mt: "5px", display: { xs: 'none', md: 'flex' } }}
            >
              Add Rating Preferences
            </Typography>
            <Box mt='10px'>
              <label> Minimum overall rating? </label><br /> <br />
              <Box width='80%' ml='30px'>
                <Slider
                  id='rating'
                  aria-label="Rating"
                  defaultValue={75}
                  valueLabelDisplay="auto"
                  step={5}
                  marks={rating}
                  min={0}
                  max={100}
                  onChange={handleChange}
                />
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