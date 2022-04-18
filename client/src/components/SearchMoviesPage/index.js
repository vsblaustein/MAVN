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
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import './SearchMoviesPage.css';
import GenreDropdown from './GenreDropdown';
import { genres } from './GenreDropdown';
import IconPopUp from './IconPopUp';

const api_key = "76e275f04f332f92388a49a0a1ad92ee";
const base_image_url = "https://image.tmdb.org/t/p/w500";

const theme = createTheme();



export default function SearchMoviesPage() {
    //iconpopup
    const [isOpen, setIsOpen] = React.useState(false);

    const [searchResults, setSearchResults] = React.useState([]);
    const [filteredResults, setFilteredResults] = React.useState([]);
    const [genres, setGenres] = React.useState([]);

    const [title, setTitle] = React.useState('')


    const setValue = (g) => {
        setGenres(g);
    }

    //icon popup
    const togglePopup = (item) => {
        console.log('press')
        setIsOpen(!isOpen);
        title == '' ? setTitle(item.title) : setTitle('')
    }

    function filterMovies() {
        //console.log("filtering by genre: ", genres);
        if (!searchResults) {
            return null;
        }

        //helper function to check if an array contains another array
        //arr is the main array. we are checking if target is included in arr.
        let checker = (arr, target) => target.every(v => arr.includes(v));

        const results = [];
        for (var movie of searchResults) {
            //iterate over each movie here
            //each movie will have a list of genres. This list must contain ALL of whatever is in the genre filter.
            //in other words, genre filter must be a subset of movie_genres.
            //console.log("movie genres: ", movie.genres);
            if (checker(movie.genres, genres)) {
                //console.log("found a match");
                results.push(movie);
            }
        }
        //console.log("after filtering results: ", results);
        //at the end, set filtered results.
        setFilteredResults(results);
    }

    // this will trigger every time title search results changes for re-rendering
    React.useEffect(() => {
        //console.log("searchResults: ", searchResults);
    }, [searchResults]);

    React.useEffect(() => {
        //console.log("genres: ", genres);
        filterMovies();
    }, [genres]);

    React.useEffect(() => {
        //console.log("filteredResults: ", filteredResults);
    }, [filteredResults]);

    const getMovieFromDB = async (title, year) => {
        try {
            const resp = await Axios.post('http://localhost:3001/getMovie', {
                t: title,
                y: year
            });
            //console.log("data: ", resp.data);
            return resp.data;
        } catch (err) {
            console.error(err);
        }
    }

    const getMovieGenresFromDB = async (title, year) => {
        //need to run query in server
        try {
            const resp = await Axios.post('http://localhost:3001/getGenresOfMovie', {
                t: title,
                y: year
            });
            //console.log("moviegenres from db: ", resp.data);
            const results = [];
            for (var x of resp.data) {
                results.push(x.genre);
            }
            //console.log("movie genres from db: ", results)
            return results;
        } catch (err) {
            console.error(err);
        }
    }

    const getAndSetMovieData = async (id) => {
        //this object will hold relevant metadata required for DB insertion on title search queries
        const movie_data = {
            title: "",
            year: 0,
            length: 0,
            image_path: "",
            rating: 0.0,
            plot: "",
            genres: [],
            actors: [],
            actor_dobs: []
        };
        //query movie data along with credits
        const JSON_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US&append_to_response=credits`;
        //console.log("URL", JSON_URL);

        //call axios api to get a json
        var res_json = await axiosCall(JSON_URL);
        // console.log("movie_query_result: ", res_json);

        //set movie_data to whatever we can off of this singular query.
        const data = Object.create(movie_data);
        //console.log("prototype ", Object.getPrototypeOf(movie_data));
        data.title = res_json.title;
        data.year = res_json.release_date.substring(0, 4).length > 0 ? res_json.release_date.substring(0, 4) : '0000';
        //check db contains title/year
        const movie_in_db = await getMovieFromDB(data.title, data.year);
        const movie_genres = await getMovieGenresFromDB(data.title, data.year);
        //console.log("movie in db: ", movie_in_db);
        if (movie_in_db.length > 0) {
            //console.log("found movie in db");
            var result_json = JSON.parse(
                JSON.stringify(
                    {
                        title: movie_in_db[0].title,
                        year: movie_in_db[0].year,
                        image_path: movie_in_db[0].image_path,
                        genres: movie_genres
                    }
                )
            );
            // console.log(result_json);
            return result_json;
        }
        //console.log("retrieving movie data ");

        data.length = res_json.runtime;
        if (res_json.poster_path) {
            data.image_path = base_image_url + res_json.poster_path;
        }
        data.rating = res_json.vote_average;
        data.plot = res_json.overview.substring(0, 990) + "...";

        // push the genres on
        for (var id of res_json.genres) {
            data.genres.push(id.name);
        }
        //console.log("data.genres: ", data.genres);
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
        //console.log("movie_data: ", data);

        // GUARDS FOR DUPLICATE INSERTS
        // get the list of previously added movies, commas make split
        const currMovies = [];
        const x = JSON.parse(localStorage.getItem("movie_title"));
        for (const c in x) {
            currMovies.push(x[c]);
        }
        // get this from storage
        const existingActors = [];
        const ea = JSON.parse(localStorage.getItem('actors'));
        for (const c in ea) {
            existingActors.push(ea[c]);
        }

        // prints the list of movies stored in the database
        //console.log(currMovies);
        if (!currMovies.includes(data.title)) {
            // add to movies table
            Axios.post('http://localhost:3001/addMovie', {
                m_title: data.title,
                m_year: data.year,
                m_length: data.length,
                m_image_path: data.image_path,
                m_rating: data.rating,
                m_plot: data.plot,
            }).then((response) => {
                //console.log(response);
                // add to the list so if queried again, will not add
                currMovies.push(data.title);
                localStorage.setItem('movie_title', JSON.stringify(currMovies));
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                // FOREIGN KEY INSERTS MUST WAIT ON THE PREVIOUS

                // add to movie_genres table
                for (const g in data.genres) {
                    Axios.post('http://localhost:3001/addMovieGenre', {
                        m_title: data.title,
                        m_year: data.year,
                        m_genre: data.genres[g],
                    }).then((response) => {
                        //console.log(response);
                    }).catch(err => {
                        console.log(err);
                    });
                }

                // insert into actors
                //console.log("existing: " + existingActors);
                for (const a in data.actors) {
                    const curr = data.actors[a].name;
                    // check if already added to avoid dup entry error
                    if (!existingActors.includes(curr)) {
                        //console.log("add " + curr);
                        Axios.post('http://localhost:3001/addActors', {
                            fl_name: curr,
                            f_name: curr.substring(0, curr.indexOf(' ')),
                            l_name: curr.substring(curr.indexOf(' ') + 1),
                            a_dob: data.actor_dobs[a] != null ? data.actor_dobs[a] : '0000-00-00',
                        }).then((response) => {
                            // add the existing actor to the list
                            //console.log("adding " + curr + " to the list");
                            existingActors.push(curr);
                            localStorage.setItem('actors', JSON.stringify(existingActors));

                            //console.log(response);
                        }).catch(err => {
                            console.log(err);
                        }).finally(() => {
                            //query for cast_members table
                            Axios.post('http://localhost:3001/addCastMembers', {
                                m_title: data.title,
                                m_year: data.year,
                                m_actor: curr,
                                m_actor_dob: data.actor_dobs[a] != null ? data.actor_dobs[a] : '0000-00-00',
                            }).then((response) => {
                                //console.log(response);
                            }).catch(err => {
                                console.log(err);
                            });


                        });
                    }
                    else {
                        //console.log("already exists: " + curr);
                    }

                }
            });

        }
        else {
            //console.log("already inserted " + data.title);
        }

        //console.log("movie_data: ", data);
        //here's where im supposed to create queries to insert into the respective tables.
        //query for movies table
        //query for genres table
        //query for cast_members table
        //query for actors table

        var result_json = JSON.parse(
            JSON.stringify(
                {
                    title: data.title,
                    year: data.year,
                    image_path: data.image_path,
                    genres: data.genres
                }
            )
        );
        //console.log("result_json: ", result_json);
        return result_json;
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
            //console.log(movie_ids);

            //iterate over movie ids. for each movie id, we need to query and receive:
            //title, year, length, image, rating, plot, genre(s), all actors' names, all actor dobs
            // results will hold the title/year pair of a movie for display purposes

            for (var id of movie_ids) {
                var res = await getAndSetMovieData(id);
                //console.log("res: ", res);
                results.push(res);
            }
        }
        // console.log("final movie title/year results: ", results);

        //after everything, set searchResults to results.
        setSearchResults(results);
    };

    const handleActorSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const actor_search = data.get('actor_search');
        //console.log("actor button pressed...");
        //console.log("actor: ", actor_search);
        var results = [];

        //get actor id
        const actor_id_json_url = `https://api.themoviedb.org/3/search/person?api_key=${api_key}&language=en-US&query=${actor_search.replaceAll(' ', '%20')}`;
        //console.log("actor id json url: ", actor_id_json_url);
        var actor_id_json = await axiosCall(actor_id_json_url);
        //console.log("actor_id json: ", actor_id_json);
        if (actor_id_json.results.length <= 0) {
            //throw an error here? or display nothing?
            console.log("no actor found");
        } else {

            //actor found
            var actor_id = actor_id_json.results[0].id;
            //console.log("actor_id: ", actor_id);

            //get all movies actor appears in- store in list of IDs
            const actor_credits_json_url =
                `https://api.themoviedb.org/3/person/${actor_id}?api_key=${api_key}&language=en-US&append_to_response=movie_credits`;
            var actor_json = await axiosCall(actor_credits_json_url);
            var actor_movies = actor_json.movie_credits.cast;
            //console.log("actor movies: ", actor_movies);
            var movie_ids = getMovieIDs(actor_movies);
            //console.log("movie ids: ", movie_ids);

            //iterate over IDs and push to results
            for (var id of movie_ids) {
                var res = await getAndSetMovieData(id);
                //console.log("res: ", res);
                results.push(res);
            }
        }
        //console.log("final results: ", results);
        setSearchResults(results);
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

                <div class="box">
                    <div>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <SearchIcon />
                        </Avatar>
                    </div>
                    <div>
                        <Typography component="h1" variant="h5">
                            Filter Results
                        </Typography>
                    </div>
                    <div>
                        <GenreDropdown action={setValue} />
                    </div>
                </div>



                <Container maxWidth="lg">
                    {(genres.length === 0 && searchResults) &&
                        <ImageList sx={{ width: 1135, height: 450 }} cols={5} rowHeight={'auto'} gap={8}>
                            {searchResults.map((item, idx) => (
                                <ImageListItem key={idx} >
                                    {item.image_path.length > 0 &&
                                        <img
                                            src={`${item.image_path}?w=150&h=150&fit=crop&auto=format`}
                                            srcSet={`${item.image_path}?w=150&h=150&fit=crop&auto=format`}
                                            alt={item.title}
                                            loading="lazy"
                                            height="100%"
                                        />
                                    }
                                    {!item.image_path &&
                                        <img
                                            src={"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
                                            srcSet={"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
                                            alt={item.title}
                                            loading="lazy"
                                        />
                                    }
                                    <ImageListItemBar
                                        title={item.title}
                                        subtitle={item.year}
                                        actionIcon={
                                            <IconButton
                                                onClick={()=>togglePopup(item)}
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                aria-label={`info about ${item.title}`}
                                            >
                                                <InfoIcon />
                                                

                                            </IconButton>
                                            

                                        }
                                    />
                                
                                </ImageListItem>
                            ))}

                        </ImageList>
                        
                    }
                    {isOpen && <IconPopUp title={title} toggle={()=> togglePopup()}/>}
                    {genres.length > 0 &&
                        <ImageList sx={{ width: 1135, height: 450 }} cols={5} rowHeight={'auto'} gap={8}>
                            {filteredResults.map((item, idx) => (
                                <ImageListItem key={idx} >
                                    {item.image_path.length > 0 &&
                                        <img
                                            src={`${item.image_path}?w=150&h=150&fit=crop&auto=format`}
                                            srcSet={`${item.image_path}?w=150&h=150&fit=crop&auto=format`}
                                            alt={item.title}
                                            loading="lazy"
                                            height="100%"
                                        />
                                    }
                                    {!item.image_path &&
                                        <img
                                            src={"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
                                            srcSet={"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
                                            alt={item.title}
                                            loading="lazy"
                                        />
                                    }
                                    <ImageListItemBar
                                        title={item.title}
                                        subtitle={item.year}
                                        actionIcon={
                                            <IconButton
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                aria-label={`info about ${item.title}`}
                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        }
                                    />
                                </ImageListItem>
                            ))}

                        </ImageList>

                    }
                </Container>



            </ThemeProvider>
        </React.Fragment>
    );
}
