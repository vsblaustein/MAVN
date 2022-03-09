import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import RangeSlider from './RangeSlider';
import './PQPopUp.css';

// pop up for individual genre preferences

export default class ReleaseYear extends React.Component  {
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
                Add Release Year Preferences
              </Typography>
              <Box mt='10px'>
                <label> Preferred Movie Release Year </label><br /><br/>
                <Box width='80%' ml='30px'>
                  <RangeSlider />
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