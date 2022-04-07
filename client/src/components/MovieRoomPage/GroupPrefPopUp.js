import * as React from 'react';
import './GroupPrefPopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Slider } from '@mui/material';
import RangeSlider from './RangeSlider';
import MultipleActorSelect from './MultipleActorSelect';
import MultipleGenreSelect from './MultipleGenreSelect';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const lengthMarks = [{ value: 0, label: '0 minutes' }, { value: 60, label: '60 minutes' }, { value: 120, label: '120 minutes' }, { value: 180, label: '180 minutes' }];

export default function GQPopUp(props) {

  const[genre, setGenre] = React.useState([]);
  const[length, setLength] = React.useState(120);
  const[actors, setActors] = React.useState([]);
  const[s_year, setSYear] = React.useState(1960);
  const[e_year, setEYear] = React.useState(2000);

  let navigate = useNavigate();
  // current user should be a LIST of all users in the movie room?
  // const currentUser = JSON.parse(localStorage.getItem('user'));


  // makes the pop up disappear
  const handleExit = () => {
    props.toggle();
  };

  // submits the form to the DB
  const handleSubmit = async(event) => {
    console.log("submitting rapid preference quiz");
    // write info to the database and continue
    console.log("submitting: (actors, " + actors + ") (genres, " + genre
    + ") (release years, " + s_year + " " + e_year + ") (length, " + length + ")");

    // event.preventDefault();
    // // actors
    // for (const a in actors) {
    //   console.log("current actor: " + actors[a]);
    //   Axios.post('http://localhost:3001/actorPref', {
    //     username: currentUser,
    //     actors: actors[a],
    //   }).then((response) => {
    //     console.log(response);
    //   }).catch(err => {
    //     console.log(err);
    //   });
    // }

    // // genre
    // for (const g in genre) {
    //   console.log("current genre: " + genre[g]);
    //   Axios.post('http://localhost:3001/genrePref', {
    //     username: currentUser,
    //     genre: genre[g],
    //   }).then((response) => {
    //     console.log(response);
    //   }).catch(err => {
    //     console.log(err);
    //   });
    // }

    // // length
    // Axios.post('http://localhost:3001/lengthPref', {
    //   username: currentUser,
    //   length: length,
    // }).then((response) => {
    //   console.log(response);
    // }).catch(err => {
    //   console.log(err);
    // });

    // // release year
    // Axios.post('http://localhost:3001/releaseYearPref', {
    //   username: currentUser,
    //   s_year: s_year,
    //   e_year: e_year,
    // }).then((response) => {
    //   console.log(response);
    // }).catch(err => {
    //   console.log(err);
    // });

    // handleExit();
  }

  // set the values
  const setGenresVal = (g) => {
    setGenre(g);
  };

  const setActorsVal = (a) => {
    setActors(a);
  };

  const setReleaseYearVal = (start, end) => {
    setSYear(start);
    setEYear(end);
  };

  const setLengthVal = (event, value) => {
     setLength(value);
  };

  // add a "are you sure you want to leave?"
    return (
      <>
        <Box className="modal">
          <Box className="pq-modal_content">
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
                Rapid Preferences Quiz 
              </Typography>
              {/* movie genre */}
              <Box mt='10px'>
                <label> What genres are you feeling? </label><br />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }} >
                  <MultipleGenreSelect action={setGenresVal}/>
                </Box>
                <br />

                {/* length of movie */}
                <label> How much time do you have to watch? </label><br />
                <Box width='80%' ml='30px'>
                  <Slider
                    id='length'
                    defaultValue={120}
                    valueLabelDisplay="auto"
                    step={5}
                    marks={lengthMarks}
                    min={0}
                    max={180}
                    onChange={setLengthVal}
                  />
                </Box>
                <br />
                <Box>
                  <label> Popular actors you'd like to see? </label><br />
                  <MultipleActorSelect action={setActorsVal} id='actor select' />
                </Box><br />

                <label> Movie Release Year? </label><br />
                <Box width='80%' ml='30px'>
                  <RangeSlider action={setReleaseYearVal}/>
                </Box>

              </Box><br />
              <Button type="submit">
                Submit
              </Button>
            </Box >
          </Box>
        </Box>
      </>
    );
  }