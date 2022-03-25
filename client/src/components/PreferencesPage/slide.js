import React from 'react';
import { Slide } from "react-slideshow-image";
import "./styles.css";
import "react-slideshow-image/dist/styles.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Axios from 'axios';

// movies title and info loaded from the db
var movie_posters = [];
var movie_titles = [];

export default class slides extends React.Component {
    constructor(props) {
        super(props);
        this.slideRef = React.createRef();
        this.back = this.back.bind(this);
        this.next = this.next.bind(this);
        this.state = {
            index: 0,
            currentImage:movie_posters[0],
            currentTitle:movie_titles[0],
        };


    }

    // get the movie title and image lists
    componentDidMount() {
        // store the list of genres in local storage
        Axios.get('http://localhost:3001/getMovies', {
        }).then((response) => {
            // gives a list of json objects
            const movies = response.data;
            const m_title = [];
            const m_image = [];
            // for each movie in the JSON 
            for (const m in movies) {
                m_title.push(movies[m].title);
                m_image.push(movies[m].image_path);
            }
            console.log("movie titles: " + m_title);
            console.log("movie image: " + m_image);
            // set the movie image and title to be used in the slides
            movie_titles = m_title;
            movie_posters = m_image;
        }).catch(err => {
            console.log(err);
        });

    };

    // does nothing just goes to next movie
    back() {
        this.next();
    }

    // change the image of the movie tinder
    next() {
        // generate random index to make appear
        const num_movies = movie_posters.length;
        const val = Math.floor(Math.random() * num_movies);
        // sets the current movie title and image to that random index
        this.setState({
            index: (this.state.index + val) % num_movies,
            currentImage:movie_posters[(this.state.index + val) % num_movies],
            currentTitle:movie_titles[(this.state.index + val) % num_movies],
        });
        // console.log('index: ' + this.state.index);
        // console.log("movie url: " + this.state.currentImage);
        // console.log("movie title: " + this.state.currentTitle);
    }

    render() {
        return (
            <Box className="App">
                {/* default is first in list */}
                <br />
                <TextField id="title"
                    inputProps={{ style: { textAlign: 'center', fontSize: 25}, readOnly: true }}
                    InputProps={{ disableUnderline: true }}
                    sx={{width: '100%'}}
                    variant='standard' value={this.state.currentTitle}/> <br /> <br />

                <Box >
                    <Box >
                        <img className="lazy" src={this.state.currentImage} alt="sample" />
                    </Box>
                </Box>

                {/* change button watch adds to db, skip does nothing, both advance forward */}
                <Box className="slide-container buttons">
                    <Button onClick={this.back} sx={{ position: 'absolute', bottom: '5%', left: '13%' }}>
                        Would Skip
                    </Button>
                    <Button onClick={this.next} sx={{ position: 'absolute', bottom: '5%', right: '10%' }}>
                        Would Watch
                    </Button>
                </Box>
            </Box>
        );
    }
}


