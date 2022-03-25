import * as React from 'react';
import './PQPopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SlideShow from './slide';
import Axios from 'axios';

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

    componentDidMount() {
        // store the list of genres in local storage
        Axios.get('http://localhost:3001/getMovies', {
        }).then((response) => {
            // gives a list of json objects
            const movies = response.data;
            const m_title = [];
            const m_image = [];
            // for each movie in the JSON 
            for(const m in movies){
              m_title.push(movies[m].title);
              m_image.push(movies[m].image_path);
            }
            console.log("movie titles: " + m_title);
            console.log("movie image: " + m_image);
            // set the movie image and title to be used in the slides
            this.setState({movie_image:m_image});
            this.setState({movie_title: m_title});
        }).catch(err => {
            console.log(err);
        });
        
    };

    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

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
                                <Button sx={{ position: 'absolute', top: '10%', right: '10%' }}>
                                    Finish
                                </Button>
                            </span>
                            <SlideShow movieTitles={this.state.movie_title} 
                            movieImages={this.state.movie_image}/>
                        </Box>
                    </Box>
                </form>
            </>
        );
    }
}
