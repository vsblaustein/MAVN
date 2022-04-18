import React from 'react';
import "./styles.css";
import "react-slideshow-image/dist/styles.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Axios from 'axios';

// movies title and info loaded from the db
var movie_posters = [];
var movie_titles = [];

// store as vars because if states then one behind
// generate a random movie to start on
var currentImage = movie_posters[0];
var currentTitle = movie_titles[0];
var genreList = [];
var castList = [];
var rating = 0;
var length = 0;
var year = 0;

const currentUser = JSON.parse(localStorage.getItem('user'));

export default class slides extends React.Component {
    constructor(props) {
        super(props);
        this.slideRef = React.createRef();
        this.nextImage = this.nextImage.bind(this);
        this.swipeRight = this.swipeRight.bind(this);
        this.state = {
            index: 0,
            movie_titles:JSON.parse(localStorage.getItem('movie_title')),
            movie_posters: JSON.parse(localStorage.getItem('movie_image')),
        }
        // movie_titles = localStorage.getItem('movie_title');
        // movie_posters = localStorage.getItem('movie_image');
        console.log(this.state.movie_titles + " : " + this.state.movie_posters);

        const x = Math.floor(Math.random() * movie_posters.length) % movie_posters.length;
        currentImage = this.state.movie_posters[0];
        currentTitle = this.state.movie_titles[0];
    }


    // does nothing just goes to next movie
    nextImage() {
        // generate random index to make appear
        const num_movies = this.state.movie_posters.length;
        const val = Math.floor(Math.random() * num_movies);
        // sets the current movie title and image to that random index
        this.setState({
            index: (this.state.index + val) % num_movies,
        });
        currentImage = this.state.movie_posters[(this.state.index + val) % num_movies];
        currentTitle = this.state.movie_titles[(this.state.index + val) % num_movies];
    }

    // change the image of the movie tinder
    swipeRight() {
        
         // insert into preferences
         // get the movie genre(s)
        Axios.get('http://localhost:3001/getMovieGenres', {
            params: { movie_title: currentTitle }
        }).then((response) => {
            // list of movie genres
            const data = response.data;
            console.log("movie genres: " + JSON.stringify(data));
            // this.setState({ genreList: response.data });
            genreList = response.data;
            for (const g in genreList) {
                console.log("current genre: " + genreList[g].genre + " " + g);
                Axios.post('http://localhost:3001/genrePref', {
                  username: currentUser,
                  genre: genreList[g].genre,
                }).then((response) => {
                  console.log(response);
                }).catch(err => {
                  console.log(err);
                });
            }
        }).catch(err => {
            console.log(err);
        });
        

        // get the movie cast(s) and insert into db
        Axios.get('http://localhost:3001/getMovieCast',{
            params: { movie_title: currentTitle }
        }).then((response) => {
            // list of movie genres
            const data = response.data;
            console.log("movie cast: " + JSON.stringify(data));
            // this.setState({ castList: response.data });
            castList = response.data;
            // insert into preferences
            console.log("current cast list : " + castList);
            for (const c in castList) {
                console.log("current cast list: " + castList[c].actor);
                Axios.post('http://localhost:3001/actorPref', {
                username: currentUser,
                actors: castList[c].actor,
                }).then((response) => {
                console.log(response);
                }).catch(err => {
                console.log(err);
                });
            }
        }).catch(err => {
            console.log(err);
        });

        // get the movie metadata (length, release year, rating)
        Axios.get('http://localhost:3001/getMovieMetaData',
            {
                params: { movie_title: currentTitle }
            }).then((response) => {
                const data = response.data;
                console.log("movie metadata: " + JSON.stringify(data));
                // get and set the data for year length and rating to insert in to pref
                year = data[0].year;
                length = data[0].length;
                rating = data[0].rating;
                
                // make the inserts
                // insert into rating
                Axios.post('http://localhost:3001/ratingPref', {
                    username: currentUser,
                    rating: rating,
                }).then((response) => {
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                });

                // insert into year
                Axios.post('http://localhost:3001/releaseYearPref', {
                    username: currentUser,
                    s_year: year,
                    e_year: year,
                }).then((response) => {
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                });


                // insert into length
                Axios.post('http://localhost:3001/lengthPref', {
                    username: currentUser,
                    length: length,
                }).then((response) => {
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                });
                    }).catch(err => {
                        console.log(err);
                    });
        
        this.nextImage();


    }

    render() {
        return (
            <Box className="App">
                <TextField id="title"
                    inputProps={{ style: { textAlign: 'center', fontSize: 20 }, readOnly: true }}
                    InputProps={{ disableUnderline: true }}
                    sx={{ width: '100%', mt:'5px'}}
                    variant='standard' value={currentTitle} /> <br /> <br />

                    <Box >
                        <img className="photo" src={currentImage} alt="No movie poster available" />
                    </Box>

                {/* change button watch adds to db, skip does nothing, both advance forward */}
                <Box className="slide-container buttons">
                    <Button onClick={this.nextImage} sx={{ position: 'absolute', bottom: '5%', left: '13%' }}>
                        Would Skip
                    </Button>
                                
                    <Button onClick={this.swipeRight} sx={{ position: 'absolute', bottom: '5%', right: '10%' }}>
                        Would Watch
                    </Button>
                </Box>
            </Box>
        );
    }
}


// import React from 'react';
// import "./styles.css";
// import "react-slideshow-image/dist/styles.css";
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import { TextField } from '@mui/material';
// import Axios from 'axios';

// // movies title and info loaded from the db
// var movie_posters = JSON.parse(localStorage.getItem('movie_image'));
// var movie_titles = JSON.parse(localStorage.getItem('movie_title'));

// const currentUser = JSON.parse(localStorage.getItem('user'));

// export default class slides extends React.Component {
//     constructor(props) {
//         super(props);
//         this.slideRef = React.createRef();
//         this.nextImage = this.nextImage.bind(this);
//         this.swipeRight = this.swipeRight.bind(this);

//         const x = Math.floor(Math.random() * movie_posters.length) % movie_posters.length;
//         // set the movie image and title to be used in the slides       

//         this.state = {
//             index: 0,
//             // movie_titles:localStorage.getItem('movie_title'),
//             // movie_posters:localStorage.getItem('movie_image'),
//             currentImage:movie_posters[x],
//             currentTitle:movie_titles[x],
//             genreList:[],
//             castList:[],
//             rating:0,
//             length:0,
//             year:0,
            
//         };
//         console.log("eee");
//         console.log(this.state.currentImage + " for " + this.state.currentTitle);
//     }


//     // does nothing just goes to next movie
//     nextImage() {
//         // generate random index to make appear
//         const num_movies = movie_posters.length;
//         const val = Math.floor(Math.random() * num_movies);
//         // sets the current movie title and image to that random index
//         this.setState({
//             index: (this.state.index + val) % num_movies,
//             currentImage:movie_posters[(this.state.index + val) % num_movies],
//             currentTitle:movie_titles[(this.state.index + val) % num_movies],
//         });

//     }

//     // change the image of the movie tinder
//     swipeRight() {
        
//         // get all the metadata fields
//         this.loadMetadata();
//          // insert into preferences
//          for (const g in this.state.genreList) {
//             console.log("current genre: " + g);
//             // Axios.post('http://localhost:3001/genrePref', {
//             //   username: currentUser,
//             //   genre: this.state.genreList[g],
//             // }).then((response) => {
//             //   console.log(response);
//             // }).catch(err => {
//             //   console.log(err);
//             // });
//         }

//         // insert into preferences
//         for (const c in this.state.castList) {
//             console.log("current cast list: " + c);
//             // Axios.post('http://localhost:3001/actorPref', {
//             //   username: currentUser,
//             //   genre: this.state.castList[c],
//             // }).then((response) => {
//             //   console.log(response);
//             // }).catch(err => {
//             //   console.log(err);
//             // });
//         }

//         // // insert into rating
//         // Axios.post('http://localhost:3001/ratingPref', {
//         //     username: currentUser,
//         //     rating: this.state.rating,
//         // }).then((response) => {
//         //     console.log(response);
//         // }).catch(err => {
//         //     console.log(err);
//         // });

//         // // insert into year
//         // Axios.post('http://localhost:3001/releaseYearPref', {
//         //     username: currentUser,
//         //     s_year: this.state.year,
//         //     e_year: this.state.year,
//         // }).then((response) => {
//         //     console.log(response);
//         // }).catch(err => {
//         //     console.log(err);
//         // });


//         // // insert into length
//         // Axios.post('http://localhost:3001/lengthPref', {
//         //     username: currentUser,
//         //     length: this.state.length,
//         // }).then((response) => {
//         //     console.log(response);
//         // }).catch(err => {
//         //     console.log(err);
//         // });

//         this.nextImage();
//     }

//     loadMetadata() {
//         console.log("loading metadata for: " + this.state.currentTitle);
//         // get the movie metadata (length, release year, rating)
//         Axios.get('http://localhost:3001/getMovieMetaData',
//             {
//                 params: { movie_title: this.state.currentTitle }
//             }).then((response) => {
//                 const data = response.data;
//                 console.log("movie metadata: " + JSON.stringify(data));
//                 // get and set the data for year length and rating to insert in to pref
//                 this.setState({ year: data[0].year });
//                 this.setState({ length: data[0].length });
//                 this.setState({ rating: data[0].rating });
//             }).catch(err => {
//                 console.log(err);
//             });

//         // get the movie genre(s)
//         Axios.get('http://localhost:3001/getMovieGenres',
//             {
//                 params: { movie_title: this.state.currentTitle }
//             }).then((response) => {
//                 // list of movie genres
//                 const data = response.data;
//                 console.log("movie genres: " + JSON.stringify(data));
//                 this.setState({ genreList: response.data });
//             }).catch(err => {
//                 console.log(err);
//             });
//         // get the movie cast(s)
//         Axios.get('http://localhost:3001/getMovieCast',
//             {
//                 params: { movie_title: this.state.currentTitle }
//             }).then((response) => {
//                 // list of movie genres
//                 const data = response.data;
//                 console.log("movie cast: " + JSON.stringify(data));
//                 this.setState({ castList: response.data });
//             }).catch(err => {
//                 console.log(err);
//             });
//     }

//     render() {
//         return (
//             <Box className="App">
//                 <br />
//                 <TextField id="title"
//                     inputProps={{ style: { textAlign: 'center', fontSize: 25 }, readOnly: true }}
//                     InputProps={{ disableUnderline: true }}
//                     sx={{ width: '100%' }}
//                     variant='standard' value={this.state.currentTitle} /> <br /> <br />

//                 <Box >
//                     <Box >
//                         <img className="lazy" src={this.state.currentImage} alt="sample" />
//                     </Box>
//                 </Box>

//                 {/* change button watch adds to db, skip does nothing, both advance forward */}
//                 <Box className="slide-container buttons">
//                     <Button onClick={this.nextImage} sx={{ position: 'absolute', bottom: '5%', left: '13%' }}>
//                         Would Skip
//                     </Button>
//                     <Button onClick={this.swipeRight} sx={{ position: 'absolute', bottom: '5%', right: '10%' }}>
//                         Would Watch
//                     </Button>
//                 </Box>
//             </Box>
//         );
//     }
// }