import * as React from 'react';
import ResponsiveAppBar from '../ResponsiveAppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';
import Axios from 'axios';
import SearchResultsGrid from '../SearchResultsGrid/SearchResultsGrid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const api_key = "76e275f04f332f92388a49a0a1ad92ee";

const theme = createTheme();

export default function SearchMoviesPage() {
    const [titleSearchResults, setTitleSearchResults] = React.useState(null);

    //this object will hold relevant metadata required for DB insertion on title search queries
    const movie_data = {
        title: "",
        year: 0,
        length: 0,
        image_path: "https://image.tmdb.org/t/p/w500",
        rating: 0.0,
        plot: "",
        genres: [],
        actors: [],
        actor_dobs: []
    };

    // this will trigger every time title search results changes for re-rendering
    React.useEffect(() => {
    }, [titleSearchResults]);

    const getAndSetMovieData = async (id) => {
        //query movie data along with credits
        const JSON_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US&append_to_response=credits`;
        //console.log("URL", JSON_URL);

        //call axios api to get a json
        var res_json = await axiosCall(JSON_URL);
        console.log("movie_query_result: ", res_json);

        //set movie_data to whatever we can off of this singular query.
        const data = Object.create(movie_data);
        data.title = res_json.title;
        data.year = res_json.release_date.substring(0, 4);
        data.length = res_json.runtime;
        data.image_path += res_json.poster_path;
        data.rating = res_json.vote_average;
        data.plot = res_json.overview;
        for (var id of res_json.genres) {
            data.genres.push(id.name);
        }
        const movie_cast = res_json.credits.cast;
        //var actor_ct = 0;
        for (var actor of movie_cast) {
            var actor_id = actor.id;
            data.actors.push(actor);
            //get actor DOB using actor id
            const actor_id_json_url = `https://api.themoviedb.org/3/person/${actor_id}?api_key=${api_key}&language=en-US`;
            var actor_json = await axiosCall(actor_id_json_url);
            //console.log("actor info: ", actor_json);
            data.actor_dobs.push(actor_json.birthday);
            //actor_ct += 1;
        }
        console.log("movie_data: ", data);
        //here's where im supposed to create queries to insert into the respective tables.
        //query for movies table
        //query for genres table
        //query for cast_members table
        //query for actors table



        return [data.title, data.year];
    }

    const getMovieIDs = (data) => {
        var ids = [];
        for (var movie of data) {
            ids.push(movie.id);
        }
        return ids;
    }

    const axiosCall = async (url) => {
        try {
            const response = await Axios(url);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    const handleTitleSubmit = async (event) => {

        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const title_search = data.get('title_search');
        //console.log("title button pressed...");
        //console.log("title: ", title_search);
        /*
        What needs to be done here?
        1. get ALL movies that contain title_search as a substring
        2. for each movie result, grab movie metadata using API QUERY_detail
        3. populate DB with all of these movies' metadata
        4. display resulting movies
        */

        //create JSON url for HTTP request
        const JSON_URL = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${title_search.replace(' ', '+')}`;
        //console.log("JSON URL: ", JSON_URL);
        //call API using axios, get results
        var title_api_data = await axiosCall(JSON_URL);
        var results = [];
        //error checking for title results
        if (title_api_data.results.length <= 0) {
            //throw error!
            console.log("oops no movies found");
        } else {

            //console.log("title data: ", title_api_data);
            //get movie ids
            var movie_ids = getMovieIDs(title_api_data.results);
            console.log(movie_ids);

            //iterate over movie ids. for each movie id, we need to query and receive:
            //title, year, length, image, rating, plot, genre(s), all actors' names, all actor dobs
            // results will hold the title/year pair of a movie for display purposes

            for (var id of movie_ids) {
                var res = await getAndSetMovieData(id);
                console.log("res: ", res);
                results.push(res);
            }
        }
        console.log("final movie title/year results: ", results);

        //after everything, set titleSearchResults to results.
        setTitleSearchResults(results);
    };

    const handleActorSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const actor_search = data.get('actor_search');
        console.log("actor button pressed...");
        console.log("actor: ", actor_search);
        var results = [];

        //get actor id
        const actor_id_json_url = `https://api.themoviedb.org/3/search/person?api_key=${api_key}&language=en-US&query=${actor_search.replaceAll(' ', '%20')}`;
        console.log("actor id json url: ", actor_id_json_url);
        var actor_id_json = await axiosCall(actor_id_json_url);
        console.log("actor_id json: ", actor_id_json);
        if (actor_id_json.results.length <= 0) {
            //throw an error here? or display nothing?
            console.log("no actor found");
        } else {
            //actor found
            var actor_id = actor_id_json.results[0].id;
            console.log("actor_id: ", actor_id);
            //get all movies actor appears in- store in list of IDs

            //iterate over IDs and push to results
        }

    };

    return (
        <React.Fragment>
            <ResponsiveAppBar />

            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xl">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <SearchIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Movie Search
                        </Typography>
                        <Grid item xs={3} sm={6}>
                            <Box component="form" noValidate onSubmit={handleTitleSubmit} sx={{ mt: 1 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="title_search"
                                            label="Title"
                                            name="title_search"
                                            autoComplete="title_search"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 2, mb: 2 }}
                                >
                                    Search Titles
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={3} sm={6}>
                            <Box component="form" noValidate onSubmit={handleActorSubmit} sx={{ mt: 1 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="actor_search"
                                            label="Actor"
                                            name="actor_search"
                                            autoComplete="actor_search"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 2, mb: 2 }}
                                >
                                    Search Titles for Actor
                                </Button>
                            </Box>
                        </Grid>
                    </Box>
                </Container>

                <Container maxWidth="md">
                    <ImageList sx={{ width: '100%', height: '100%', padding: 0 }} cols={5} rowHeight={180}>
                        {itemData.map((item) => (
                            <ImageListItem key={item.img} sx={{ width: '100%', height: '100%', left: 40, m: '10px' }}>
                                <img
                                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Container>



            </ThemeProvider>
        </React.Fragment>
    );
}

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
