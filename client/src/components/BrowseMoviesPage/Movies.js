import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
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
      >
        {g}
        </Typography>

        <ImageList sx={{ width: '100%', height:'100%', padding:0}} cols={itemData.length} rowHeight={180}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} sx={{width:'100%', height:'100%', left:40, m:'10px'}}>
            <img
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            /> 
          </ImageListItem>
        ))}
      </ImageList>
      </>
    ))}
    </Box>
    
    </>
  );
}

const genres = [
    'Action', 'Horror', 
    'Comedy', 'Romance', 
    'Western', 'Sci-fi', 
    'Drama', 'Adventure', 'Musical'
];

const itemData = [
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ3XyL74-DQ1iaIm1Gr2D_iAdcmDwPfwvNaA&usqp=CAU',
    title: 'Genre',
  },
  {
    img: 'https://assets.whatsnewonnetflix.com/external_assets/sggkh+%5B%5Blxx*9*8931*07_8_muochl_mvg%5Bwmn%5Bzkr%5Be3%5BC805vQhtDYWV7zJyzMwnXCTFK*B%5BZZZZYueIXLz6VnhF8WggRmyRYgkovJn1up*JjahceXWugYlIo1pRdG4q77A*C0wiRU5CU%5D1FYFEvZaHkac5%5DDkoK6c9NF5R.jpg',
    title: 'Length',
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbq0uRkdRYZvm7WKOM5HnwFcTzAD5-vPKw7g&usqp=CAU',
    title: 'Release Year',
  },
  {
    img: 'https://i.pinimg.com/originals/d6/cb/6f/d6cb6f2e6c7e4e4f8d0ae094e8032b60.jpg',
    title: 'Actors',
  },
  {
    img: 'https://i.ytimg.com/vi/p0BpMFTYFpU/maxresdefault.jpg',
    title: 'Rating',
  },
];
