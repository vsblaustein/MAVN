import * as React from 'react';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const SearchResultsGrid = ({ movies, setMovies }) => {

    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={0.5}></Grid>
        </ThemeProvider>
    );
}

export default SearchResultsGrid