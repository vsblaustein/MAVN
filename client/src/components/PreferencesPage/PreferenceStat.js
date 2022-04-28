import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ImageListItemBar } from '@mui/material';
import Button from '@mui/material/Button';
import Genre from './genre';
import Actors from './actors';
import Length from './length';
import ReleaseYear from './release_year';
import Rating from './rating';
import StatChart from './chart';
import Axios from 'axios';

// this document will generate the charts from the db and display them

export default class PreferencesStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // boolean are true if pop up shown
      genre: false,
      length: false,
      year: false,
      actors: false,
      rating: false,
      actor_pref: [],
      genre_pref: [],
      length_pref: [],
      rating_pref: [],
      released_after_pref: [],
      released_before_pref: [],
      showChart: true,
    };

  }

  handleClick = (title) => {
    if (title === "Genre") {
      console.log("genre");
      this.toggleGenre();
    }
    else if (title === "Length (minutes)") {
      console.log("length");
      this.toggleLength();
    }
    else if (title === "Released Before" || title === 'Released After') {
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

  // methods to toggle pop ups
  toggleGenre = () => {
    this.setState({
      genre: !this.state.genre,
      showChart: !this.state.showChart,
    });
  };

  toggleLength = () => {
    this.setState({
      length: !this.state.length,
      showChart: !this.state.showChart,
    });
  };

  toggleYear = () => {
    this.setState({
      year: !this.state.year,
      showChart: !this.state.showChart,
    });
  };

  toggleActors = () => {
    this.setState({
      actors: !this.state.actors,
      showChart: !this.state.showChart,
    });
  };

  toggleRating = () => {
    this.setState({
      rating: !this.state.rating,
      showChart: !this.state.showChart,
    });
  };

  // set the state for the chart with the given data from query
  setChart = (chart, data) => {
    if (chart === 'actor_pref') {
      this.setState({ actor_pref: data });
    }
    else if (chart === 'genre_pref') {
      this.setState({ genre_pref: data });
    }
    else if (chart === 'length_pref') {
      this.setState({ length_pref: data });
    }
    else if (chart === 'rating_pref') {
      this.setState({ rating_pref: data });
    }
    else if (chart === 'start_year_pref') {
      this.setState({ released_after_pref: data });
    }
    else if (chart === 'end_year_pref') {
      this.setState({ released_before_pref: data });
    }
  };

  // return the chart data to render
  getChart = (index) => {
    const c = chart[index];
    if (c === 'actor_pref') {
      return this.state.actor_pref;
    }
    else if (c === 'genre_pref') {
      return this.state.genre_pref;
    }
    else if (c === 'length_pref') {
      return this.state.length_pref;
    }
    else if (c === 'rating_pref') {
      return this.state.rating_pref;
    }
    else if (c === 'start_year_pref') {
      return this.state.released_after_pref;
    }
    else {
      return this.state.released_before_pref;
    }

  }

  // do this on componenet render
  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem('user'));

    // for each chart get the stats from the query
    for (const c in chart) {
      console.log("preferred chart: " + chart[c]);
      Axios.get('http://localhost:3001/getPrefChart',
        {
          params: { username: currentUser, table: chart[c] }
        }).then((response) => {

          const currChart = chart[c];
          this.setChart(currChart, response.data);
          this.setState({ currChart: response.data });
          console.log(currChart + " " + JSON.stringify(this.state.currChart));
        }).catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <>
        {this.state.genre ? <Genre tc={this.props.toggleChart} toggle={this.toggleGenre} /> : null}
        {this.state.actors ? <Actors toggle={this.toggleActors} /> : null}
        {this.state.length ? <Length toggle={this.toggleLength} /> : null}
        {this.state.year ? <ReleaseYear toggle={this.toggleYear} /> : null}
        {this.state.rating ? <Rating toggle={this.toggleRating} /> : null}
        <ImageList sx={{
          width: '100%', height: '100%', padding: 0,
          alignItems: "center", justifyContent: "center", justify: 'center'
        }} cols={6} rowHeight={270}>
          {preferences.map((preference, index) => (
            <ImageListItem key={index} sx={{ width: '150px', height: '100%', left: 40, m: '10px', objectFit: 'cover' }}>
              {this.state.showChart && <StatChart chartRes={this.getChart(index)} />}
              <ImageListItemBar
                title={preference.title}
                align='center'
                position="below"
                fontWeight='bold'
              />
              <Button id={preference.title + '_button'}
                onClick={() => this.handleClick(preference.title)} >
                Edit
              </Button>
            </ImageListItem>
          ))}



        </ImageList>

      </>
    );
  }
}

const preferences = [
  { title: 'Genre' }, { title: 'Length (minutes)' }, { title: 'Actors' },
  { title: 'Rating' }, { title: 'Released After' }, { title: 'Released Before' },
];
const chart = ['genre_pref', 'length_pref', 'actor_pref', 'rating_pref', 'start_year_pref', 'end_year_pref'];
