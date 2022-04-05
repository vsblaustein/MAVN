import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Axios from 'axios';
import MovieList from './MovieList';

// get the genres from local storage
const genres = localStorage.getItem('genres').split(',');
  
import MetaDataPopUp from './MetaDataPopUp';
// this document will generate the charts from the db and display them

export default function Movies() {
 

  const handleClick = (movieTitle) => {
    
    movieTitle = "Abby Singer";

    console.log(movieTitle);
    //retrieve a movie's meta data
    Axios.get('http://localhost:3001/getMetadata', {
      title: movieTitle
    }).then((response)=> {
        // gives a list of json objects
        const movieData = JSON.stringify(response.data);
        console.log(movieData);
      
    }).catch(err => {
      console.log(err);
    });

  };


 

  return (
    <>
      <Box>
        {genres.map((g) => (
          <>
            <Typography
              variant="h7"
              noWrap
              component="div"
              sx={{ ml: "15px", mt: "20px", display: { xs: 'none', md: 'flex' } }}
              fontWeight='bold'
              key={g}
            >
              {g}
            </Typography>
            {/* add the movie lists here by genre, separate call because infinite loop rendering */}
            <MovieList sx={{height:'100',}} genre={g}/>
          </>
        ))}
      </Box>

    </>
  );
}




