import * as React from 'react';
import './GroupPrefPopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { TextField } from '@mui/material';


export default class MovieSelectionPopUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            movies: props.selectList,
            alert_img: props.alertImg,
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

    handleExit = () => {
        this.removeAlert();
        this.props.toggle();
    }

    removeAlert = () => {
        for (const i in this.state.memberList){
            const user = this.state.memberList[i];
            console.log("in remove alert");
            console.log(user);
            if (user != this.state.movieMaster){
                Axios.post('http://localhost:3001/removeSelectionAlert', {
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

    render() {
        var currentSelectionImage = this.state.alert_img;
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
                                Movie Selected!
                            </Typography>
                            <span className="close" onClick={this.handleExit}>
                                <Button>
                                    Exit
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


                        </Box>
                    </Box>
                </form>
            </>
        );
    }
}