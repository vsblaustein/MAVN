import * as React from 'react';
import './MovieSelectionPopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { movieImgPath, roomMaster, rCode} from '.';
import Axios from 'axios';

export default class MovieSelectionPopUp extends React.Component {
    constructor(){
        super();
        this.state = {
            index : 0, 
            showMasterButtons: false,
            groupVotes: 0,
            imgPath: movieImgPath,
        };
        this.movieImages = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbq0uRkdRYZvm7WKOM5HnwFcTzAD5-vPKw7g&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ3XyL74-DQ1iaIm1Gr2D_iAdcmDwPfwvNaA&usqp=CAU"]
    }

    componentDidMount(){
        const currUser = JSON.parse(localStorage.getItem('user'));
        if (currUser == roomMaster){
            this.setState({showMasterButtons: true})
        }
    }
    handleExit = () => {
        this.props.toggle();
    };

    voteAgainstSelection = () => {
        let i = this.state.groupVotes;
        i +=1;
        console.log("gorup votes: " + i)
        this.setState({groupVotes: i})
        //get members of group
        const c = rCode;
        console.log(rCode);
        Axios.get('http://localhost:3001/getMembersList', {
            params: { room_code: c}
        }).then((response) => {
          const numMembers = response.data.length;
          //if more than half of members vote, remove selection
          if (i > (numMembers/2)){
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
    };

    newSelection = () => {
        const c = rCode;
        const t = "The Avengers: A Visual Journey";
        const y = 2012;
        const img = "https://image.tmdb.org/t/p/w500/2kBT7KONKQTIhkMc2ZtPU11E8Ky.jpg";
        console.log("params: " + c + " " + t + " " + y);
        Axios.post('http://localhost:3001/movieSelection', {
            code: c, title: t, year: y, imagePath: img
        }).then((response) => {
            this.setState({imgPath: img});
            movieImgPath = img;
            this.togglePQ();
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
    }

    // add a "are you sure you want to leave?"
    render() {
        var currentSelectionImage = this.state.imgPath; //this.movieImages[this.state.index]
        var show = this.state.showMasterButtons;
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
                            <span className="close" onClick={this.handleExit}>
                                <Button>
                                    Finish
                                </Button>
                            </span>

                            <Box
                                component="img"
                                class='center-screen'
                                sx={{
                                    maxHeight: { xs: 250, md: 167 },
                                    maxWidth: { xs: 350, md: 250 },
                                }}
                                alt="The house from the offer."
                                src={currentSelectionImage}
                            />



                            {!show && <Button onClick={this.voteAgainstSelection} sx={{ position: 'absolute', bottom: '10%', left: '30%' }}>Vote against Selection</Button>}
                            {show && <Button onClick={this.vetoSelection} sx={{ position: 'absolute', bottom: '10%', left: '30%' }}>Veto Selection</Button>}

                        </Box>
                    </Box>
                </form>
            </>
        );
    }
}