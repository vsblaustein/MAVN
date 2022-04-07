import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PQPopUp.css';

// pop up for individual length preferences

const lengthMarks = [{ value: 0, label: '0 minutes' }, { value: 60, label: '60 minutes' }, { value: 120, label: '120 minutes' }, { value: 180, label: '180 minutes' }];


export default function Length(props) {
  const [value, setValue] = React.useState(120);

  const handleExit = () => {
    props.toggle();
  };

  let navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  // submits query to database with information from form
  const handleSubmit = async (event) => {
    console.log('submit length pref for ' + currentUser);
    event.preventDefault();
    Axios.post('http://localhost:3001/lengthPref', {
      username: currentUser,
      length: value,
    }).then((response) => {
      console.log(response);
      navigate("/my%20preferences", { replace: true });
    }).catch(err => {
      console.log(err);
    });
    document.location.reload();
    handleExit();
  }

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <>
      <Box className="modal">
        <Box className="modal-content">
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
              Add Length Preferences
            </Typography>
            <Box mt='10px'>
              <label> How much time do you have to watch? </label><br /> <br />
              <Box width='80%' ml='30px'>
                <Slider
                  id='length'
                  aria-label="Length"
                  defaultValue={120}
                  valueLabelDisplay="auto"
                  step={5}
                  marks={lengthMarks}
                  min={0}
                  max={180}
                  onChange={handleChange}
                />
              </Box>
            </Box>

            <Button type="submit" sx={{mt:'10px'}}>
              Submit
            </Button>
          </Box >
        </Box>
      </Box>
    </>
  );
}