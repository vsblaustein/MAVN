import * as React from 'react';
import './PQPopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Slider } from '@mui/material';
import RangeSlider from './RangeSlider';

const genres = ['Action', 'Horror', 'Comedy', 'Romance', 'Western', 'Sci-fi', 'Drama', 'Adventure', 'Musical']
const actors = ['Ryan Gosling', 'Channing Tatum', 'Amanda Seyfried', 'Adam Sandler', 'Rachel McAdams', 'Lily James', 'Tom Holland', 'Emma Watson', 'Emma Stone']
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

  // this adds radio button on refresh, want to add and select in form?
  handleOther = () => {
    var input = document.getElementById('other');
    var curr = input.value;
    console.log(curr);
    actors.push(curr);
  }

  
  // add a "are you sure you want to leave?"
  render() {
    return (
      <>
        <Box className="modal">
          <Box className="modal_content">
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
                  {genres.map((g) => (
                    <>
                      <input type='checkbox' value={g} name={g} id={g} />
                      <label for={g}>{g}</label> &nbsp;
                    </>
                  ))}
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
                  <Box sx={{ width: '99%' }} >
                    {actors.map((a) => (
                      <>
                        <input type='checkbox' value={a} name={a} id={a} />
                        <label for={a}>{a}</label> &nbsp;
                      </>
                    ))} <br />

                    <input type='text' id='other' name='other' placeholder='Other' />
                    <Button onClick={this.handleOther} sx={{ size: 'small' }}> Add </Button>
                  </Box>
                </Box><br/>

                <label> How vintage are you feeling today? </label><br />
                <Box width='80%' ml='30px'>
                  <RangeSlider/>

                </Box>

              </Box><br/>


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