import React from 'react';
import './PopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Axios from 'axios';

export default class IconMetadata extends React.Component {
    state = {
        rating: "",
        year: "",
        plot: "",
        castmembers: "",
        actors: [],
    }

    componentDidMount() { //ONLOAD
        Axios.get('http://localhost:3001/getMovieMetaData', {
            params: { movie_title: this.props.title }
        }
        ).then((response) => {
            this.setState({
                plot: response.data[0].plot,
                year: response.data[0].year,
                rating: response.data[0].rating
            })

        }).catch(err => {
            console.log(err);
        });

        Axios.get('http://localhost:3001/getMovieCast', {
            params: { movie_title: this.props.title }
        }
        ).then((response) => {
            //add actors to state array
            console.log(response.data);
            for(let i =0; i<response.data.length; i++){
                this.setState(prevState => ({
                    actors: [...prevState.actors, response.data[i].actor + " ,"]
                  }))
            }
            console.log(this.state.actors);
        }).catch(err => {
            console.log(err);
        });

        this.forceUpdate();
        this.render();
        console.log(this.state.plot);

    }

    render() {
        return (
            <Box className="App">
                <h6>{this.props.title}</h6>
                <Typography
                    variant="h9" component="div"
                    sx={{ ml: "10px", mt: "20px", display: { xs: 'none', md: 'flex' } }}
                >
                    plot: {this.state.plot}
                    
                </Typography>
                <Typography
                    variant="h9"
                    component="div"
                    sx={{ ml: "10px", mt: "20px", display: { xs: 'none', md: 'flex' } }}
                >
                    rating: {this.state.rating}
                </Typography>
                <Typography
                    variant="h9"
                    component="div"
                    sx={{ ml: "10px", mt: "20px", display: { xs: 'none', md: 'flex' } }}
                >
                    year: {this.state.year}
                </Typography>
                <Typography
                    variant="h9"
                    component="div"
                    sx={{ ml: "10px", mt: "20px", display: { xs: 'none', md: 'flex' } }}
                >
                    Cast: {this.state.actors}
                </Typography>
            </Box>
        );
    }
}
