import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ImageListItemBar, ListItem } from '@mui/material';
import Button from '@mui/material/Button';
import Genre from './genre';
import Actors from './actors';
import Length from './length';
import ReleaseYear from './release_year';
import Rating from './rating';
import StatChart from './chart';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import { ListItemText } from '@mui/material';

// this document will generate the charts from the db and display them

export default class PreferencesStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: false,
      length: false,
      year: false,
      actors: false,
      rating: false,
    };
  }

  handleClick = (title) => {
    if (title === "Genre") {
      console.log("genre");
      this.toggleGenre();
    }
    else if (title === "Length") {
      console.log("length");
      this.toggleLength();
    }
    else if (title === "Release Year") {
      console.log("year");
      this.toggleYear();
    }
    else if (title === "Actors") {
      console.log("actors");
      this.toggleActors();
    }
    else {
      console.log("rating");
      this.toggleRating();
    }
  }

  // determines if either state has been seen
  // may need to add user to the state    

  // methods to toggle pop ups
  toggleGenre = () => {
    this.setState({
      genre: !this.state.genre
    });
  };

  toggleLength = () => {
    this.setState({
      length: !this.state.length
    });
  };

  toggleYear = () => {
    this.setState({
      year: !this.state.year
    });
  };

  toggleActors = () => {
    this.setState({
      actors: !this.state.actors
    });
  };

  toggleRating = () => {
    this.setState({
      rating: !this.state.rating
    });
  };

  render() {
    return (
      <>
      <ImageList sx={{ width: '100%', height:'100%', padding:0}} cols={5} rowHeight={270}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} sx={{width:'150px', height:'100%', left:40, m:'10px',objectFit:'cover'}}>
            {/* <img
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            /> */}
            {/* pass in result as prop? */}
            <StatChart/>
            <ImageListItemBar
              title={item.title}
              align='center'
              position="below"
              fontWeight='bold'
            />
            <Button id={item.title + '_button'} onClick={() => this.handleClick(item.title)}>Edit</Button>
          </ImageListItem>
        ))}
        {this.state.genre ? <Genre toggle={this.toggleGenre} /> : null}
        {this.state.actors ? <Actors toggle={this.toggleActors} /> : null}
        {this.state.length ? <Length toggle={this.toggleLength} /> : null}
        {this.state.year ? <ReleaseYear toggle={this.toggleYear} /> : null}
        {this.state.rating ? <Rating toggle={this.toggleRating} /> : null}
      </ImageList>
       </>
    );
  }
}

const itemData = [
  {
    img: 'https://www.tableau.com/sites/default/files/2021-06/DataGlossary_Icons_Pie%20Chart.jpg',
    title: 'Genre',
  },
  {
    img: 'https://www.tableau.com/sites/default/files/2021-06/DataGlossary_Icons_Pie%20Chart.jpg',
    title: 'Length',
  },
  {
    img: 'https://www.tableau.com/sites/default/files/2021-06/DataGlossary_Icons_Pie%20Chart.jpg',
    title: 'Release Year',
  },
  {
    img: 'https://www.tableau.com/sites/default/files/2021-06/DataGlossary_Icons_Pie%20Chart.jpg',
    title: 'Actors',
  },
  {
    img: 'https://www.tableau.com/sites/default/files/2021-06/DataGlossary_Icons_Pie%20Chart.jpg',
    title: 'Rating',
  },
];
