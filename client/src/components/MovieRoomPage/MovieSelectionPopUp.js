import * as React from 'react';
import './GroupPrefPopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { roomMaster, rCode } from '.';
import Axios from 'axios';
import { TextField } from '@mui/material';


export default class MovieSelectionPopUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            movies: props.selectList,
            movieImages: [],
            currentTitle: "",
            showMasterButtons: false,
            groupVotes: 0,
        };

    }

    async componentDidMount() {
        // get the movie images
        var images = [];
        var key = Array.from(this.state.movies.keys())[this.state.index];

        console.log(this.state.movies);
        this.state.movies.forEach(function (value, key) {
            images.push(key.image_path);
        })

        this.setState({
            movieImages: images,
            currentTitle: key.title,
        })

        console.log("movie images:" + this.state.movieImages);

        const currUser = JSON.parse(localStorage.getItem('user'));
        if (currUser == roomMaster) {
            this.setState({ showMasterButtons: true })
        }

    }

    handleExit = () => {
        this.props.toggle();
    };

    voteAgainstSelection = () => {
        let i = this.state.groupVotes;
        i += 1;
        console.log("gorup votes: " + i)
        this.setState({ groupVotes: i })
        //get members of group
        const c = rCode;
        console.log(rCode);
        Axios.get('http://localhost:3001/getMembersList', {
            params: { room_code: c }
        }).then((response) => {
            const numMembers = response.data.length;
            //if more than half of members vote, remove selection
            if (i > (numMembers / 2)) {
                this.newSelection();
            }
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
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
            this.handleExit();
        }

        // set the title and index
        var key = Array.from(this.state.movies.keys())[this.state.index + 1];
        this.setState({ index: i, currentTitle: key.title });
    }

    // add a "are you sure you want to leave?"
    render() {
        var show = this.state.showMasterButtons;

        var currentSelectionImage = this.state.movieImages[this.state.index];
        return (
            <>
                <form>
                    <Box className="modal">
                        <Box className="mr-modal_content">
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ mt: "5px", display: { xs: 'none', md: 'flex' } }}
                            >
                                Movie Selection
                            </Typography>
                            {this.state.currentTitle !== "" &&
                                <React.Fragment>
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
                            {this.state.currentTitle === "" &&
                                <React.Fragment>
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




                        </Box>
                    </Box>
                </form>
            </>
        );
    }
}