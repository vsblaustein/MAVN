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
import WeightSlider from './weightSlider';

const lengthMarks = [{ value: 0, label: '0 minutes' }, { value: 60, label: '60 minutes' }, { value: 120, label: '120 minutes' }, { value: 180, label: '180 minutes' }];

export default function GQPopUp(props) {

    const [genre, setGenre] = React.useState(50);
    const [length, setLength] = React.useState(50);
    const [actors, setActors] = React.useState(50);
    const [rating, setRating] = React.useState(50);
    const [s_year, setSYear] = React.useState(50);
    const [e_year, setEYear] = React.useState(50);

    // current user should be a LIST of all users in the movie room?
    // const currentUser = JSON.parse(localStorage.getItem('user'));


    // makes the pop up disappear
    const handleExit = () => {
        props.toggle();
    };

    // submits the form to the DB
    const handleSubmit = async (event) => {
        console.log("updating preference weights");
        // write info to the database and continue
        console.log("new weights: (genre: " + genre + ") (actor, " + actors
            + ") (release years, " + s_year + " " + e_year + ") (length, " + length + ")");

        event.preventDefault();
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

        handleExit();
    }

    // set the values in the sliders
    const setGenresVal = (g) => {
        setGenre(g);
    };

    const setActorsVal = (a) => {
        setActors(a);
    };

    const setReleaseYearVal = (start) => {
        setSYear(start);
        setEYear(start);
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
                            Edit Preference Weights
                        </Typography>
                        {/* movie genre */}
                        <Box mt='10px'>
                            <label> How important is genre? </label><br />
                            <WeightSlider action={setGenresVal} />
                            <br />

                            {/* length of movie */}
                            <label> How important is length? </label><br />
                            <WeightSlider action={setLengthVal} />
                            <br />
                            <label> How important are actors? </label><br />
                            <WeightSlider action={setActorsVal} />

                            <br />

                            <label> How important is release year? </label><br />
                            <WeightSlider action={setReleaseYearVal} />

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