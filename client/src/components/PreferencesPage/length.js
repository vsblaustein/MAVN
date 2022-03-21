import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import './PQPopUp.css';

// pop up for individual length preferences

const lengthMarks = [{ value: 0, label: '0 minutes' }, { value: 60, label: '60 minutes' }, { value: 120, label: '120 minutes' }, { value: 180, label: '180 minutes' }];


export default class Length extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 120
    };
  }

  handleExit = () => {
    this.props.toggle();
  };

  handleSubmit = () => {
    // write info to the database and continue
    console.log('submit length: ' + this.state.value);
    this.handleExit();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <>
        <Box className="modal">
          <Box className="mini_slide_pref_modal">
            <span className="close" onClick={() => this.handleExit()}>
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
                    step={10}
                    marks={lengthMarks}
                    min={0}
                    max={180}
                    onChange={this.handleChange}
                  />
                </Box>
              </Box>

              <Button onClick={() => this.handleSubmit()}>
                Submit
              </Button>
            </form >
          </Box>
        </Box>
      </>
    );
  }
}