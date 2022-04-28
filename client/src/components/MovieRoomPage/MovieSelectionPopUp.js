import * as React from 'react';
import './GroupPrefPopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';



export default class MovieSelectionPopUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            movies: props.selectList,
            alert_img: props.alertImg,
            alert_title: props.alertTitle,
            memberList: props.mem,
            movieImages: [],
            movieMaster: props.master,
            currentTitle: "",
            currentYear: 0,
            showMasterButtons: false,
            groupVotes: 0,
            roomCode: window.location.href.split('/')[4],
        };

    }

    async componentDidMount() {

        const currUser = JSON.parse(localStorage.getItem('user'));
        if (currUser == this.state.movieMaster){
            // get the movie images
            var images = [];
            var key =Array.from(this.state.movies.keys())[this.state.index];
            
            this.state.movies.forEach(function (value, key) {
                images.push(key.image_path);
            })

            this.setState({
                movieImages: images,
                currentTitle: key.title,
                currentYear: key.year,
            })

            console.log("movie images:" + this.state.movieImages[0]);            
            this.setState({showMasterButtons: true})
            this.createAlerts(key.title, key.year, key.image_path);
        }
    }

    handleExitMaster = () => {
        this.selectMovie();
        this.props.toggle();
    };

    handleExit = () => {
        this.removeAlert();
        this.props.toggle();
    }

    selectMovie = () => {
        this.removeAlert();

        const img = this.state.movieImages[this.state.index];
        //add movie to movie_selection table
        const t = this.state.currentTitle;
        const y = this.state.currentYear;
        Axios.post('http://localhost:3001/movieSelection', {
            code: this.state.roomCode,
            title: t,
            year: y,
            imagePath: img,
        }).then((response) => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        });

        //add selection alerts
        for (const i in this.state.memberList){
            const user = this.state.memberList[i];
            console.log("user: " + this.state.memberList[user]);
            if (user != this.state.movieMaster){ //don't add extra alert for master
                Axios.post('http://localhost:3001/addSelectionAlert', {
                    code: this.state.roomCode,
                    title: t,
                    year: y,
                    imagePath: img,
                    username: user,
                }).then((response) => {
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }

    createAlerts = (t, y , img) => {
        console.log("in alerts")
        //add alert to alert table for each member in a room 
        console.log(this.state.memberList);
        for (const i in this.state.memberList){
            const user = this.state.memberList[i];
            console.log("user: " + this.state.memberList[user]);
            if (user != this.state.movieMaster){ //don't add extra alert for master
                Axios.post('http://localhost:3001/addAlert', {
                    code: this.state.roomCode,
                    title: t,
                    year: y,
                    imagePath: img,
                    username: user,
                }).then((response) => {
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    };

    removeAlert = () => {
        for (const i in this.state.memberList){
            const user = this.state.memberList[i];
            console.log(user);
            if (user != this.state.movieMaster){
                Axios.post('http://localhost:3001/removeAlert', {
                    code: this.state.roomCode,
                    username: user,
                }).then((response) => {
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }

    voteAgainstSelection = () => {
        let i = this.state.groupVotes;
        i +=1;
        console.log("group votes: " + i)
        this.setState({groupVotes: i})
        const numMembers = this.state.memberList.length;
        //if more than half of members vote, remove selection
        if (i > (numMembers/2)){
            this.newSelection();
        }else{   
            this.handleExit();  
        } 
    };
          

    vetoSelection = () => {
        //if master doesn't like movie, remove selection
        this.newSelection();
    }

    // goes to next best movie in list
    newSelection = () => {
        let i = this.state.index;
        console.log("index: " + i)
        i = i + 1;
        // alert that went through all movies
        if (i === this.state.movies.size) {
            alert("No more movie selections to choose from");
            this.removeAlert();
            this.props.toggle();
        }

        // set the title and index
        var key = Array.from(this.state.movies.keys())[this.state.index + 1];
        this.setState({ index: i, currentTitle: key.title, currentYear: key.year});
        this.removeAlert();
        this.createAlerts(key.title, key.year, key.image_path);
    }

    // add a "are you sure you want to leave?"
    render() {
        var show = this.state.showMasterButtons;

        var currentSelectionImage = show ? this.state.movieImages[this.state.index] : this.state.alert_img;
        var currentSelectionTitle = show ? this.state.currentTitle : this.state.alert_title;
        return (
            <>
                <form>
                    <Box className="modal">
                        <Box className="mr-modal_content">

                            {(this.state.movies && this.state.movies.size > 0) &&
                                <React.Fragment>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="div"
                                        sx={{ mt: "5px", display: { xs: 'none', md: 'flex' } }}
                                    >
                                        Movie Selection
                                    </Typography>
                                    <span className="close" onClick={this.handleExit}>
                                        <Button>
                                            Select Movie
                                        </Button>
                                    </span>
                                    <TextField id="title"
                                        inputProps={{ style: { textAlign: 'center', fontSize: 20 }, readOnly: true }}
                                        InputProps={{ disableUnderline: true }}
                                        sx={{ width: '100%', mt: '5px' }}
                                        variant='standard' value={this.state.currentTitle} />

                                    <Box
                                        component="img"
                                        class='center-screen'
                                        sx={{
                                            maxHeight: { xs: 250, md: 167 },
                                            maxWidth: { xs: 350, md: 250 },
                                        }}
                                        alt="No movie image"
                                        src={currentSelectionImage}
                                    />
                                    {!show && <Button onClick={this.voteAgainstSelection} sx={{ position: 'absolute', bottom: '10%', left: '30%' }}>Vote against Selection</Button>}
                                    {show && <Button onClick={this.vetoSelection} sx={{ position: 'absolute', bottom: '10%', left: '30%' }}>Veto Selection</Button>}
                                </React.Fragment>
                            }
                            {(this.state.movies && this.state.movies.size <= 0) &&
                                <React.Fragment>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="div"
                                        sx={{ mt: "5px", display: { xs: 'none', md: 'flex' } }}
                                    >
                                        Movie Selection
                                    </Typography>
                                    <span className="close" onClick={this.handleExit}>
                                        <Button>
                                            Close
                                        </Button>
                                    </span>
                                    <TextField id="title"
                                        inputProps={{ style: { textAlign: 'center', fontSize: 15 }, readOnly: true }}
                                        InputProps={{ disableUnderline: true }}
                                        sx={{ width: '100%', mt: '85px' }}
                                        variant='standard' value={"No movie selection found. Consider a more lenient preference bias!"} />
                                </React.Fragment>
                            }
                            {this.state.movies === null &&
                                <React.Fragment>
                                    <TextField id="title"
                                        inputProps={{ style: { textAlign: 'center', fontSize: 20 }, readOnly: true }}
                                        InputProps={{ disableUnderline: true }}
                                        sx={{ width: '100%', mt: '50px' }}
                                        variant='standard' value={"Loading..."} />
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="div"
                                        sx={{ mt: "10px", mr: "85px", ml: "185px", display: { xs: 'none', md: 'flex' } }}
                                    >
                                        <CircularProgress size={200} />
                                    </Typography>

                                </React.Fragment>

                            }



                        </Box>
                    </Box>
                </form>
            </>
        );
    }
}