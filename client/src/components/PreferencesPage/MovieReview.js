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
                                <Button sx={{ position: 'absolute', top:'10%', right: '10%' }}>
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

const movies = [
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
