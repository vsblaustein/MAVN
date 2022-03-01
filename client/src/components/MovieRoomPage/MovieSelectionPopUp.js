import * as React from 'react';
import './MovieSelectionPopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default class MovieSelectionPopUp extends React.Component {

    handleExit = () => {
        this.props.toggle();
    };

    // add a "are you sure you want to leave?"
    render() {
        return (
            <>
                <form>
                    <Box className="modal">
                        <Box className="mr-modal_content" centered>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ mt: "5px", display: { xs: 'none', md: 'flex' } }}
                            >
                                Movie Selection
                            </Typography>
                            <span className="close" onClick={this.handleExit}>
                                <Button>
                                    Finish
                                </Button>
                            </span>

                            <Box
                                component="img"
                                class='center-screen'
                                sx={{
                                    maxHeight: { xs: 250, md: 167 },
                                    maxWidth: { xs: 350, md: 250 },
                                }}
                                alt="The house from the offer."
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbq0uRkdRYZvm7WKOM5HnwFcTzAD5-vPKw7g&usqp=CAU"
                            />



                            <Button sx={{ position: 'absolute', bottom: '10%', left: '30%' }}>Generate New Selection</Button>
                        </Box>
                    </Box>
                </form>
            </>
        );
    }
}