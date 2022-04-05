import * as React from 'react';
import './MovieSelectionPopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const imgPath = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbq0uRkdRYZvm7WKOM5HnwFcTzAD5-vPKw7g&usqp=CAU"
export default class MovieSelectionPopUp extends React.Component {
    constructor(){
        super();
        this.state = {index : 0};
        this.movieImages = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbq0uRkdRYZvm7WKOM5HnwFcTzAD5-vPKw7g&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ3XyL74-DQ1iaIm1Gr2D_iAdcmDwPfwvNaA&usqp=CAU"]
    }
    handleExit = () => {
        this.props.toggle();
    };

    vetoSelection = () => {
        let i = this.state.index;
        console.log("index: " + i)
        if (i == 0){
            i = 1;
        }else{
            i = 0;
        }
        this.setState({index: i});
    };

    // add a "are you sure you want to leave?"
    render() {
        var currentSelectionImage = this.movieImages[this.state.index]
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



                            <Button onClick={this.vetoSelection} sx={{ position: 'absolute', bottom: '10%', left: '30%' }}>Generate New Selection</Button>

                        </Box>
                    </Box>
                </form>
            </>
        );
    }
}