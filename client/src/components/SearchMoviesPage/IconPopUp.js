import * as React from 'react';
import './PopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconMetadata from './IconMetadata';

//IMPLEMENT ICONMETADATA
export default class IconPopUp extends React.Component {
    
    handleClick = () => {
        this.props.toggle();
    };

    handleExit = () => {
        this.props.toggle();
    };

    render() {
        return (
            <div style={{zIndex:999}}>
                <Box className="modal" style={{zIndex:999}}class="centered">
                    <Box className="mr-modal_content" sx={{zIndex:99, width: 700, height: 500, }} >
                        {this.props.content}
                        <IconMetadata title={this.props.title}></IconMetadata>

                        <span className="close" onClick={this.handleExit}>
                            <Button>

                                Close
                            </Button>
                        </span>

                    </Box >
                </Box>
            </div>

        );
    }
}