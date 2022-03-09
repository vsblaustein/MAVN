import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MultipleGenreSelect from './MultipleGenreSelect';
import Button from '@mui/material/Button';
import './PQPopUp.css';



export default class Genre extends React.Component  {
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
          <Box className="mini_pref_modal">
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
                Add Genre Preferences
              </Typography>
              <Box mt='10px'>
                <label> What genres are you feeling? </label><br />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }} >
                  <MultipleGenreSelect />
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