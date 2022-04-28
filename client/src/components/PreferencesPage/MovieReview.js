import * as React from 'react';
import './PQPopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SlideShow from './slide';

export default class MovieSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movie_title: [],
            movie_image: [],
            movies: [],
        };
    };

    handleExit = () => {
        this.props.toggle();
    };

    // add a "are you sure you want to leave?"
    render() {
        return (
            <>
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

                        <SlideShow movieTitles={this.state.movie_title}
                            movieImages={this.state.movie_image} />
                        <Button onClick={this.handleExit} sx={{ position: 'absolute', top: '10%', right: '10%' }}>
                            Finish
                        </Button>
                    </Box>
                </Box>
            </>
        );
    }
}
