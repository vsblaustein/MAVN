import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default class MetaDataPopUp extends React.Component {
  handleClick = () => {
   this.props.toggle();
  };

  handleExit = () => {
    this.props.toggle();
};

render() {
  return (
    <>
    <div>
        <Box className="modal" class = "centered">
            <Box className="mr-modal_content">
                
                
                <h1>pull metadata from the database</h1>

                <span className="close" onClick={this.handleExit}>
                    <Button>
                        Exit
                    </Button>
                </span>

                           </Box >
        </Box>
    </div>
</>
  );
 }
}