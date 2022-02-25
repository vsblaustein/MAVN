import ResponsiveAppBar from '../ResponsiveAppBar/index'
import * as React from 'react';
import { Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Movies from './Movies';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.light, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

// display current preferences at the bottom of the page
export default class BrowseMoviesPage extends React.Component {

  // gets the search value, will need to update the page to return values satisfying the search
  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      console.log('enter press here! ')
      const val = document.getElementById('search').value;
      console.log(val);
    }
  }

  render() {
    return (
      <>
        <ResponsiveAppBar />

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ ml: "15px", mt: "20px", display: { xs: 'none', md: 'flex' } }}
        >
          Browse Movies
          <Search sx={{ right: 40, position: 'absolute' }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onKeyPress={this.handleKeyPress}
              id='search'
            />
          </Search>
        </Typography>

        <Movies/>

      </>
    );
  }
}
