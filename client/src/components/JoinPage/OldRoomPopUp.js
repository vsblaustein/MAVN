import * as React from 'react';
import './PopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Switch, 
    Route, Redirect,} from "react-router-dom";
    import { Link } from 'react-router-dom';

export default class OldRoomPopUp extends React.Component {
  handleClick = () => {
   this.props.toggle();
  };

  handleExit = () => {
    this.props.toggle();
};
render() {
  return (
    <>
    <form>
        <Box className="modal" class = "centered">
            <Box className="mr-modal_content">
                <Typography
                    class = "centered"
                    variant="h3"
                    noWrap
                    component="div"
                    sx={{ mt: "10px", display: { xs: 'none', md: 'flex' } }}
                >
                    Choose a Room!
                </Typography>
                <select>
                <option value="grapefruit">Mehdi's Room</option>
                <option value="lime">Abby's Room</option>
                <option selected value="coconut">Nate's Room</option>
                <option value="mango">Valentina's Room</option>
              </select>
                

                <span className="close" onClick={this.handleExit}>
                    <Button>
                        Finish
                    </Button>
                </span>

                           </Box >
        </Box>
    </form>
</>
  );
 }
}