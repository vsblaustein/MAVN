import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ImageListItemBar } from '@mui/material';
import Button from '@mui/material/Button';
import StatChart from './chart';
import Axios from 'axios';

// this document will generate the charts from the db and display them

export default class PreferencesStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actor_pref: [],
      genre_pref: [],
      length_pref: [],
      rating_pref: [],
      released_after_pref: [],
      released_before_pref:[],
    };
  }

  // set the state for the chart with the given data from query
  setChart = (chart, data) => {
    if(chart === 'actor_pref'){
      this.setState({actor_pref:data});
    }
    else if(chart === 'genre_pref'){
      this.setState({genre_pref:data});
    }
    else if(chart === 'length_pref'){
      this.setState({length_pref:data});
    }
    else if(chart === 'rating_pref'){
      this.setState({rating_pref:data});
    }
    else if(chart === 'start_year_pref'){
      this.setState({released_after_pref:data});
    }
    else if(chart === 'end_year_pref'){
      this.setState({released_before_pref:data});
    }
  };

  // return the chart data to render
  getChart = (index) => {
    const c = chart[index];
    if(c === 'actor_pref'){
      return this.state.actor_pref;
    }
    else if(c === 'genre_pref'){
      return this.state.genre_pref;
    }
    else if(c === 'length_pref'){
      return this.state.length_pref;
    }
    else if(c === 'rating_pref'){
      return this.state.rating_pref;
    }
    else if(c === 'start_year_pref'){
      return this.state.released_after_pref;
    }
    else {
      return this.state.released_before_pref;
    }

  }

  // do this on componenet render
  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    console.log("yer");
    
    // for each chart get the stats from the query
    for (const c in chart) {
      console.log("preferred chart: " + chart[c]);
      Axios.get('http://localhost:3001/getGroupPrefChart',
        {
          params: { username: ['nate','smolnate'], table: chart[c] }
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
        <ImageList sx={{ width: '100%', height: '100%', padding: 0,
        alignItems:"center",justifyContent:"center", justify:'center'}} cols={6} rowHeight={270}>
          {preferences.map((preference, index) => (
            <ImageListItem key={index} sx={{ width: '150px', height: '100%', left: 40, m: '10px', objectFit: 'cover' }}>
              <StatChart chartRes={this.getChart(index)} />
              <ImageListItemBar
                title={preference.title}
                align='center'
                position="below"
                fontWeight='bold'
              />
            </ImageListItem>
          ))}
        </ImageList>
      </>
    );
  }
}

const preferences = [
  { title: 'Genre' }, { title: 'Length (minutes)' }, { title: 'Actors' }, 
  { title: 'Rating' }, { title: 'Released After' },{ title: 'Released Before' },
];
const chart = ['genre_pref', 'length_pref', 'actor_pref', 'rating_pref', 'start_year_pref', 'end_year_pref'];

