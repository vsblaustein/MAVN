import React from 'react';
import { Slide } from "react-slideshow-image";
import "./styles.css";
import "react-slideshow-image/dist/styles.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

export default class slides extends React.Component {
    constructor(props) {
        super(props);
        this.slideRef = React.createRef();
        this.back = this.back.bind(this);
        this.next = this.next.bind(this);
        this.state = {
            current: 0,
            index: 1
        };

        console.log("images:" + props.movieImages);
        // sets the movie slideshow to a current list of movies
        movie_titles = props.movieTitles;
        movie_posters = props.movieImages;
    }

    back() {
        console.log("do nothing");
        this.next();
    }

    next() {
        this.slideRef.current.goNext();
        const num_movies = movie_posters.length;
        this.setState ({
            index:(this.state.index + 1) % num_movies
        });
        document.getElementById('title').value = movie_titles[this.state.index];
        console.log('index: ' + this.state.index);
        console.log(movie_posters[this.state.index]);
    }

    render() {
        const properties = {
            duration: 5000,
            autoplay: false,
            transitionDuration: 500,
            arrows: false,
            infinite: true,
            easing: "ease",
        };

        return (
            <Box className="App">
                {/* default is first in list */}
                <br/>
                <TextField id="title" 
                inputProps={{ style: {textAlign: 'center', fontSize: 25}, readOnly:true}}
                InputProps={{disableUnderline:true}}
                variant='standard' defaultValue={movie_titles[0]} /> <br/> <br/>

                <Box className="slide-container"  >
                    <Slide ref={this.slideRef} {...properties}>
                        {movie_posters.map((movie, index) => (
                            <Box key={index} className="each-slide" >
                                <img className="lazy" src={movie} alt="sample" />
                            </Box>
                        ))}
                    </Slide>
                </Box> 

                {/* change button watch adds to db, skip does nothing, both advance forward */}
                <Box className="slide-container buttons">
                    <Button onClick={this.back} sx={{ position: 'absolute', bottom: '5%', left: '13%' }}>
                        Would Skip
                    </Button>
                    <Button onClick={() => this.next()} sx={{ position: 'absolute', bottom: '5%', right: '10%' }}>
                        Would Watch
                    </Button>
                </Box>
            </Box>
        );
    }
}

// movies should get loaded from db
var movie_posters = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ3XyL74-DQ1iaIm1Gr2D_iAdcmDwPfwvNaA&usqp=CAU',
    'https://assets.whatsnewonnetflix.com/external_assets/sggkh+%5B%5Blxx*9*8931*07_8_muochl_mvg%5Bwmn%5Bzkr%5Be3%5BC805vQhtDYWV7zJyzMwnXCTFK*B%5BZZZZYueIXLz6VnhF8WggRmyRYgkovJn1up*JjahceXWugYlIo1pRdG4q77A*C0wiRU5CU%5D1FYFEvZaHkac5%5DDkoK6c9NF5R.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbq0uRkdRYZvm7WKOM5HnwFcTzAD5-vPKw7g&usqp=CAU',
    'https://i.pinimg.com/originals/d6/cb/6f/d6cb6f2e6c7e4e4f8d0ae094e8032b60.jpg',
    'https://i.ytimg.com/vi/p0BpMFTYFpU/maxresdefault.jpg'
];

var movie_titles = [
    'movie1',
    'movie2',
    'movie3',
    'movie4',
    'movie5',
]
