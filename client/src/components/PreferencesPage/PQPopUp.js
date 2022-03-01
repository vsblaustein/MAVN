import * as React from 'react';
import './PQPopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Slider } from '@mui/material';
import RangeSlider from './RangeSlider';
import MultipleSelect from './MultipleActorSelect';
import MultipleGenreSelect from './MultipleGenreSelect';

const lengthMarks = [{ value: 0, label: '0 minutes' }, { value: 60, label: '60 minutes' }, { value: 120, label: '120 minutes' }, { value: 180, label: '180 minutes' }];

function valuetext(value) {
  console.log(value);
  return value;
}

export default class PQPopUp extends React.Component {

  state = {
    sliderVal: 3
  }

  handleExit = () => {
    this.props.toggle();
  };

  handleSubmit = () => {
    console.log("submit quiz");
    // write info to the database and continue
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


  handleAddActors = () => {
    console.log("add all actors");
  }

  handleClearActors = () => {
    console.log("clear actor selections");
  }

  handleAddGenres = () => {
    console.log("add all genres");
  }

  handleClearGenres = () => {
    console.log("clear genre selections");
  }


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
              <Box >
                <label> What genres are you feeling? </label><br />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }} >
                  <MultipleGenreSelect />
                  <Button onClick={this.handleAddGenres}>Add Genres</Button>
                  <Button onClick={this.handleClearGenres}>Clear Genres</Button>
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
                    getAriaValueText={valuetext}
                    step={10}
                    marks={lengthMarks}
                    min={0}
                    max={180}
                  // onChangeCommitted to get value?
                  />
                </Box>
                <br />
                {/* it would be cool to take these from their current preferences, add other box with write in */}
                {/* actors */}
                <Box>
                  <label> Popular actors you'd like to see? </label><br />
                  <MultipleSelect id='actor select' />
                  <Button onClick={this.handleAddActors}>Add Actors</Button>
                  <Button onClick={this.handleClearActors}>Clear Actors</Button>
                </Box><br />

                <label> How vintage are you feeling today? </label><br />
                <Box width='80%' ml='30px'>
                  <RangeSlider />
                </Box>

              </Box><br />


              <Button onClick={this.handleSubmit}>
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </>
    );
  }
}