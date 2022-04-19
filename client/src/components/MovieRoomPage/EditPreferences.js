import * as React from 'react';
import './GroupPrefPopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import WeightSlider from './weightSlider';

export default function GQPopUp(props) {

    const [genre, setGenre] = React.useState(50);
    const [length, setLength] = React.useState(50);
    const [actors, setActors] = React.useState(50);
    const [rating, setRating] = React.useState(50);
    const [year, setYear] = React.useState(50);

    // current user should be a LIST of all users in the movie room?
    // const currentUser = JSON.parse(localStorage.getItem('user'));

    // makes the pop up disappear
    const handleExit = () => {
        props.toggle();
    };

    // submits the form to the DB
    // store as state variables to index prop? when generate movie selection multiply by these at the end?
    const handleSubmit = async (event) => {
        console.log("updating preference weights");
        // write info to the database and continue
        console.log("new weights: (genre: " + genre + ") (release years, " +
         year + ") (length, " + length + ") (rating: "+ rating + ") (actors: " + actors + ")");

        // set the values in the previous componenet to use in SelectionAlgo
        props.update('g_pref', genre);
        props.update('l_pref', length);
        props.update('ry_pref', year);
        props.update('r_pref', rating);
        props.update('a_pref', actors);

        event.preventDefault();
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
        setYear(start);
    };

    const setLengthVal = (value) => {
        setLength(value);
    };

    const setRatingVal = (r) => {
        setRating(r);
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
                            Edit Preference Weights:
                        </Typography>
                        <Typography
                            variant="h9"
                            noWrap
                            component="div"
                            sx={{ mt: "5px", display: { xs: 'none', md: 'flex' } }}
                        >
                            50% means equal say as the group
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
                            <br />

                            <label> How important is rating? </label><br />
                            <WeightSlider action={setRatingVal} />

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