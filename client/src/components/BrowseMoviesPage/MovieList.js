import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import Axios from 'axios';
export default function MovieList(props) {

    //Fetch Metadata
    const handleClick = (movieTitle) => {
        console.log(movieTitle);
        /*//retrieve a movie's meta data
        Axios.get('http://localhost:3001/getMetadata', {
          title: movieTitle
        }).then((response)=> {
            // gives a list of json objects
            const movieData = JSON.stringify(response.data);
            console.log(movieData);
          
        }).catch(err => {
          console.log(err);
        });*/
    
      };

    const [itemData, setItemData] = React.useState([]);

    // get the list of movies of the current genre and return their poster image
    React.useEffect(() => {
        Axios.get('http://localhost:3001/getMovieGenre',
            {
                params: { m_genre: props.genre }
            }).then((response) => {
                // console.log("movies of genre " + currentGenre + " : " + response.data);
                const data = response.data;
                const arr = []
                for (const c in data) {
                    arr.push(data[c].img);
                }
                setItemData(arr);
                console.log(arr + " for " + props.genre);
            }).catch(err => {
                console.log(err);
            });
    }, [props.genre]);

    // add method to get metadata on click, maybe add hover capability?
    return (
        <>
            <Box>

                <ImageList sx={{ width: '100%', height: '100%', padding: 0 }} cols={itemData.length + 3} rowHeight={180}>
                    {itemData.map((item) => (
                        <ImageListItem onClick={() => {handleClick(item.title)}} key={item} sx={{ maxWidth: 300, height:180, objectFit:'cover', float:'left'}}>
                            <img
                                src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={props.genre}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>

        </>
    );
}
