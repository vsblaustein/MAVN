import * as React from 'react';
import ResponsiveAppBar from '../ResponsiveAppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { Link as RouterLink} from 'react-router-dom' ;
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

const theme = createTheme();

export default function SearchMoviesPage() {

    const [searchResults, setSearchResults] = React.useState("");

    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log("search button pressed...")
      };

    return (
        <React.Fragment>
            <ResponsiveAppBar />

            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
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
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="user_search"
                                        label="Title, Actor, Genre"
                                        name="user_search"
                                        autoComplete="user_search"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}
                            >
                                Search
                            </Button>

                        </Box>
                    </Box>
                </Container>               
            </ThemeProvider>
            <SearchResultsGrid
                movies = {searchResults}
                setMovies = {setSearchResults}
             />
        </React.Fragment>
    );
}