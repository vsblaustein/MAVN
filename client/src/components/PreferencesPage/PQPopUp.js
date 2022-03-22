import * as React from 'react';
import './PQPopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Slider } from '@mui/material';
import RangeSlider from './RangeSlider';
import MultipleActorSelect from './MultipleActorSelect';
import MultipleGenreSelect from './MultipleGenreSelect';
import Length from './length';

const lengthMarks = [{ value: 0, label: '0 minutes' }, { value: 60, label: '60 minutes' }, { value: 120, label: '120 minutes' }, { value: 180, label: '180 minutes' }];

export default class PQPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderVal: 3,
      genres:[],
      rating:'',
      length:120,
      actors:[],
      s_year:1960,
      e_year:2000};
  }


  // makes the pop up disappear
  handleExit = () => {
    this.props.toggle();
  };

  // submits the form to the DB
  handleSubmit = () => {
    console.log("submit quiz");
    // write info to the database and continue
    console.log("submitting: (actors, " + this.state.actors + ") (genres, " + this.state.genres
    + "(release years, " + this.state.s_year + " " + this.state.e_year + ") (length, " + this.state.length + ")");
  }

  // setting state vs passing variables?
  handleSlider = () => {
    var input = document.getElementById('length');
    var curr = input.value;
    this.setState({
      sliderVal: curr
    })
    console.log(this.state.sliderVal)
  }

  // set the values
  setGenres = (g) => {
    this.setState({
      genres: g,
    });
  };

  setActors = (a) => {
    this.setState({
      actors: a,
    });
  };

  setReleaseYear = (start, end) => {
    console.log(start);
    console.log(end);
    this.setState({
      s_year: start,
      e_year: end,
    });
  };

  setLength = (event, value) => {
    this.setState({ 
      length:value,
     });
  };

  // add a "are you sure you want to leave?"
  render() {
    return (
      <>
        <Box className="modal">
          <Box className="pq-modal_content">
            <span className="close" onClick={this.handleExit}>
              <Button>
                Exit
              </Button>
            </span>
            {/* may need to define an action */}
            <form>
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
                  <MultipleGenreSelect action={this.setGenres}/>
                </Box>
                <br />

                {/* length of movie */}
                <label> How much time do you have to watch? </label><br />
                <Box width='80%' ml='30px'>
                  <Slider
                    id='length'
                    aria-label="Length"
                    defaultValue={120}
                    valueLabelDisplay="auto"
                    // this changes every time hover, want when stops
                    step={5}
                    marks={lengthMarks}
                    min={0}
                    max={180}
                    onChange={this.setLength}
                  />
                </Box>
                <br />
                {/* actors */}
                <Box>
                  <label> Popular actors you'd like to see? </label><br />
                  <MultipleActorSelect action={this.setActors} id='actor select' />
                </Box><br />

                <label> Movie Release Year? </label><br />
                <Box width='80%' ml='30px'>
                  <RangeSlider action={this.setReleaseYear}/>
                </Box>

              </Box><br />
              <Button onClick={this.handleSubmit}>
                Submit
              </Button>
            </form >
          </Box>
        </Box>
      </>
    );
  }
}