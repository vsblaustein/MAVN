import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Axios from 'axios';
import MovieList from './MovieList';
import MetaDataPopUp from './MetaDataPopUp';

// get the genres from local storage
const genres = localStorage.getItem('genres').split(',');
  
// this document will generate the charts from the db and display them

export default function Movies() {
 
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




