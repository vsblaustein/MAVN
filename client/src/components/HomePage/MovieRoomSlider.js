import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useHistory, useNavigate } from 'react-router-dom';

// this document will generate the charts from the db and display them

function MovieRoomSlider() {
  const navigate = useNavigate()

  const handleClick = (e) => {
    navigate("/movie%20room");

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

            <ImageList sx={{ width: '100%', height: '100%', padding: 0 }} cols={itemData.length} rowHeight={180}>
                {itemData.map((item, index) => (

                  <ImageListItem key={index} sx={{ width: '100%', height: '100%', left: 40, m: '10px' }}>
                    <img
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"
                      required onClick={(e) => { handleClick(e) }}
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
  'Movie Rooms'
];

const itemData = [
  {
    img: 'https://cdn.mos.cms.futurecdn.net/BYoRtmrsC7pptUMKNjjY2G.jpg',
    title: 'Movie Room 1',
  },
  {
    img: 'https://st4.depositphotos.com/2853475/24694/i/600/depositphotos_246948790-stock-photo-group-arabian-businessmen-kandura-meeting.jpg',
    title: 'Movie Room 2',
  },
  {
    img: 'http://thoughtcatalog.com/wp-content/uploads/2014/04/shutterstock_172218023.jpg',
    title: 'Movie Room 3',
  },
  {
    img: 'https://sitmeanssit.com/dog-training-mu/san-gabriel-valley-dog-training/files/2017/10/dog-friends.jpg',
    title: 'Movie Room 4',
  },
  {
    img: 'https://img.huffingtonpost.com/asset/604fc2f2260000cc17d854ff.jpeg?cache=htB0uiPrAE&ops=1778_1000',
    title: 'Movie Room 5',
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_RqajGYxNGZi3b8aTrPZCnTeTg05QRVp2dg&usqp=CAU',
    title: 'Movie Room 6',
  }
];

export default MovieRoomSlider;