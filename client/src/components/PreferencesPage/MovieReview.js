import * as React from 'react';
import './PQPopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default class MovieSearch extends React.Component {

    handleExit = () => {
        this.props.toggle();
    };

    // add a "are you sure you want to leave?"
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
                                Rapid Movie Review
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
                                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                            />



                            <Button sx={{ position: 'absolute', bottom: '10%', left: '13%' }}>Will Pass</Button>
                            <Button sx={{ position: 'absolute', bottom: '10%', right: '10%' }}>Would Watch</Button>
                        </Box>
                    </Box>
                </form>
            </>
        );
    }
}
