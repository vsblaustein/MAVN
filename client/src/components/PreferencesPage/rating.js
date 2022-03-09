import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Slider } from '@mui/material';
import './PQPopUp.css';

// pop up for individual rating preferences
function valuetext(value) {
    console.log(value);
    return value;
  }

  const rating = [{ value: 0, label: '0%' }, { value: 20, label: '20%' }, 
  { value: 40, label: '40%' }, { value: 60, label: '60%' }, 
  { value: 80, label: '80%' }, { value: 100, label: '100%' }];


export default class Rating extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
          genre:false};
      }

    handleExit = () => {
        this.props.toggle();
        
      };
    
    handleSubmit = () => {
        console.log("submit quiz");
        // write info to the database and continue
      }

    render () {
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
                Add Rating Preferences
              </Typography>
              <Box mt='10px'>
                <label> Minimum overall rating? </label><br /> <br/>
                <Box width='80%' ml='30px'>
                  <Slider
                    id='length'
                    aria-label="Length"
                    defaultValue={75}
                    valueLabelDisplay="auto"
                    // this changes every time hover, want when stops
                    getAriaValueText={valuetext}
                    step={5}
                    marks={rating}
                    min={0}
                    max={100}
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