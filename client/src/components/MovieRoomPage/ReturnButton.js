
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useHistory, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { Paper } from '@mui/material';
// this document will generate the charts from the db and display them


function ReturnButton() {
    const navigate = useNavigate()

    const handleClick = (e) => {
        navigate("/home");
    };

    return (
        <>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography>
                        Error: User does not have permission for this movie room.
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleClick} sx={{ mt: 1 }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Return to Home
                        </Button>

                    </Box>
                </Box>
            </Grid>

        </>
    );
}

export default ReturnButton;