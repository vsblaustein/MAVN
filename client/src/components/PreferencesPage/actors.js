import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MultipleActorSelect from './MultipleActorSelect';
import Button from '@mui/material/Button';
import './PQPopUp.css';

// pop up for individual genre preferences

export default class Actors extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
          actors:''};
      }

    handleExit = () => {
        this.props.toggle();
      };

    setValues = (a) => {
      this.setState({
        actors:a,
      });
    };
    
      handleSubmit = () => {
        console.log("submit quiz");
        // write info to the database and continue, actors is array
        console.log("actors: " + this.state.actors);
        this.handleExit();
      }
    

    render () {
    return (
        <>
        <Box className="modal">
          <Box className="mini_pref_modal" component="form" onSubmit={this.handleSubmit}>
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
                Add Actor Preferences
              </Typography>
              <Box mt='10px'>
                <label> Who should you see on the big screen? </label><br />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }} >
                  <MultipleActorSelect action={this.setValues} toggle={this.handleExit}/>
                  <Button onClick={() => this.handleSubmit()}> Submit </Button>
                </Box> 
              </Box>

            </form >
          </Box>
        </Box>
        </>
    );
    }
}