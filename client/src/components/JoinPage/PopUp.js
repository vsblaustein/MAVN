import * as React from 'react';
import './PopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default class PopUp extends React.Component {
  handleClick = () => {
   this.props.toggle();
  };
render() {
  return (
    <>
    <form>
        <Box className="modal">
            <Box className="mr-modal_content">
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ mt: "5px", display: { xs: 'none', md: 'flex' } }}
                >
                    Enter Room Code
                </Typography>
                <form>
                  <label>
                    Name:
                    <input type="text" name="name" />
                  </label>
                  <input type="submit" value="Submit" />
                </form>
                

                <span className="close" onClick={this.handleExit}>
                    <Button>
                        Finish
                    </Button>
                </span>

                           </Box>
        </Box>
    </form>
</>
  );
 }
}