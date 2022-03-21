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
          s_year:'',
          e_year:'',};
      }

    handleExit = () => {
        this.props.toggle();
      };
    
    handleSubmit = () => {
        console.log("submit quiz");
        console.log("passing to db: " + this.state.s_year + " : " + this.state.e_year);
        this.handleExit();
        // write info to the database and continue
      };

    setValues = (start, end) => {
      console.log(start);
      console.log(end);
      this.setState({
        s_year: start,
        e_year: end,
      });
      console.log(this.state.s_year + " : " + this.state.e_year);
    };

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
                  <RangeSlider action={this.setValues} />
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