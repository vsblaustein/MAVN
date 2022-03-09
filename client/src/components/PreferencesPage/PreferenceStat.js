import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ImageListItemBar } from '@mui/material';
import Button from '@mui/material/Button';
import Genre from './genre';

// this document will generate the charts from the db and display them

export default class PreferencesStats extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      genre: false,
      length: false,
      year: false,
      actors:false,
      rating:false,
    };
  }

  // const[genre, setGenre] = React.useState(false);
  // const[length, setLength] = React.useState(false);
  // const[year, setYear] = React.useState(false);
  // const[actors, setActors] = React.useState(false);
  // const[rating,setRating] = React.useState(false);

  handleClick = (title) => {
    if(title === "Genre"){
      console.log("genre");
      this.toggleGenre();

    }
    else if(title === "Length"){
      console.log("length");
    }
    else if(title === "Release Year"){
      console.log("year");
    }
    else if (title === "Actors"){
      console.log("actors");
    }
    else {
      console.log("rating");
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

  // toggleLength = () => {
  //   this.setState({
  //     length: !this.state.length
  //   });

  // };

  // toggleYear = () => {
  //   this.setState({
  //     year: !this.state.year
  //   });

  // };

  // toggleActors = () => {
  //   this.setState({
  //     actors: !this.state.actors
  //   });

  // };

  // toggleRating = () => {
  //   this.setState({
  //     rating: !this.state.rating
  //   });

  // };

  render() {
  return (
    <ImageList sx={{ width: '100%', height:'100%', padding:0}} cols={5} rowHeight={270}>
      {itemData.map((item) => (
        <ImageListItem key={item.img} sx={{width:'150px', height:'100%', left:40, m:'10px',objectFit:'cover'}}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
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
    </ImageList>
     
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
