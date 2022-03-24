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
      genre: false,
      length: false,
      year: false,
      actors: false,
      rating: false,
      actor_pref: [],
      genre_pref: [],
      length_pref: [],
      rating_pref: [],
      release_year_pref: [],
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
    else{
      this.setState({release_year_pref:data});
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
    else{
      return this.state.release_year;
    }

  }

  // put axios in here?
  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    
    // for each chart get the stats from the query
    for (const c in chart) {
      console.log("preferred chart: " + chart[c]);
      Axios.get('http://localhost:3001/actorPrefChart',
        {
          params: { username: currentUser, table: chart[c] }
        }).then((response) => {
          
          const currChart = chart[c];
          this.setChart(currChart, response.data);
          this.setState({ currChart: response.data });
          // console.log(response.data);
          console.log(currChart + " " + JSON.stringify(this.state.currChart));
        }).catch(err => {
          console.log(err);
        });
    }
    console.log("after: " + this.state.actor_pref);
  }

  render() {
    return (
      <>
        <ImageList sx={{ width: '100%', height: '100%', padding: 0 }} cols={5} rowHeight={270}>
          {preferences.map((preference, index) => (
            <ImageListItem sx={{ width: '150px', height: '100%', left: 40, m: '10px', objectFit: 'cover' }}>
              {/* pass in result as prop? */}
              <StatChart chartRes={this.getChart(index)} />
              <ImageListItemBar
                title={preference.title}
                align='center'
                position="below"
                fontWeight='bold'
              />
              <Button id={preference.title + '_button'}
                onClick={() => this.handleClick(preference.title)}>
                Edit
              </Button>
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

const preferences = [
  { title: 'Genre' }, { title: 'Length' }, { title: 'Actors' }, { title: 'Rating' }//, { title: 'Release Year' },
];
const chart = ['genre_pref', 'length_pref', 'actor_pref', 'rating_pref'];

// import * as React from 'react';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import { ImageListItemBar } from '@mui/material';
// import Button from '@mui/material/Button';
// import Genre from './genre';
// import Actors from './actors';
// import Length from './length';
// import ReleaseYear from './release_year';
// import Rating from './rating';
// import StatChart from './chart';
// import Axios from 'axios';

// // this document will generate the charts from the db and display them

// export default function PreferencesStats(props) {

//   const [genre, setGenre] = React.useState(false);
//   const [length, setLength] = React.useState(false);
//   const [year, setYear] = React.useState(false);
//   const [actors, setActors] = React.useState(false);
//   const [rating, setRating] = React.useState(false);
//   const [actorPref, setActorPref] = React.useState([]);

//   const handleClick = (title) => {
//     if (title === "Genre") {
//       console.log("genre");
//       toggleGenre();
//     }
//     else if (title === "Length") {
//       console.log("length");
//       toggleLength();
//     }
//     else if (title === "Release Year") {
//       console.log("year");
//       toggleYear();
//     }
//     else if (title === "Actors") {
//       console.log("actors");
//       toggleActors();
//     }
//     else {
//       console.log("rating");
//       toggleRating();
//     }
//   }

//   // methods to toggle pop ups
//   const toggleGenre = () => {
//     setGenre(!genre);
//   };

//   const toggleLength = () => {
//     setLength(!length);
//   };

//   const toggleYear = () => {
//     setYear(!year);
//   };

//   const toggleActors = () => {
//     setActors(!actors);
//   };

//   const toggleRating = () => {
//     setRating(!rating);
//   };

//   // put axios in here?
//   const useEffect = async() => {
//     console.log("here");
//     const currentUser = JSON.parse(localStorage.getItem('user'));
//     console.log("sending " + currentUser);
//     Axios.post('http://localhost:3001/actorPrefChart', {
//             username: currentUser,
//         }).then((response) => {
//             console.log("pref stat response: " + response);
//             // navigate("/my%20preferences", { replace: true });
//         }).catch(err => {
//             console.log(err);
//         });

//   }

//     return (
//       <>
//         <ImageList sx={{ width: '100%', height: '100%', padding: 0 }} cols={5} rowHeight={270}>
//           {preferences.map((preference) => (
//             <ImageListItem sx={{ width: '150px', height: '100%', left: 40, m: '10px', objectFit: 'cover' }}>
//               {/* pass in result as prop? */}
//               <StatChart />
//               <ImageListItemBar
//                 title={preference.title}
//                 align='center'
//                 position="below"
//                 fontWeight='bold'
//               />
//               <Button id={preference.title + '_button'}
//                 onClick={() => handleClick(preference.title)}>
//                 Edit
//               </Button>
//             </ImageListItem>
//           ))}
//           {genre ? <Genre toggle={toggleGenre} /> : null}
//           {actors ? <Actors toggle={toggleActors} /> : null}
//           {length ? <Length toggle={toggleLength} /> : null}
//           {year ? <ReleaseYear toggle={toggleYear} /> : null}
//           {rating ? <Rating toggle={toggleRating} /> : null}
//         </ImageList>
//       </>
//     );
//   }

// const preferences = [
//   { title: 'Genre' }, { title: 'Length' }, { title: 'Release Year' }, { title: 'Actors' }, { title: 'Rating' }
// ];
