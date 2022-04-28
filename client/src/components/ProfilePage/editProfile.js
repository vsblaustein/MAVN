import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Axios from 'axios';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';
import MenuItem from '@mui/material/MenuItem';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';


export default function ProfileChange(props) {

    // weird escaping gets correct date
    const [dob, setDOB] = React.useState(new Date(props.birthday).toJSON().slice(0, 10));
    const [username, setUsername] = React.useState(props.username);
    const [email, setEmail] = React.useState(props.email);
    const [profile_img, setProfileImg] = React.useState(props.photo);
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate()

    //changes the profile_img to selected
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setProfileImg(
            value
        );
    };

    // makes the pop up disappear
    const handleExit = () => {
        props.toggle();
    };

    // if null values set them to the props vals
    const handleSubmit = () => {

        // check for null values, reset to database value
        if (email.length === 0) {
            setEmail(props.email);
        }
        if (username.length === 0) {
            setUsername(props.username);
        }
        if (profile_img.length === 0) {
            setProfileImg(props.photo);
        }
        if (dob.length === 0) {
            setDOB(props.birthday);
        }

        Axios.post('http://localhost:3001/updateUser', {
            username: username,
            email: email,
            dob: dob,
            img: profile_img,
            curr_user: currentUser,
        }).then((response) => {
            if (response.data === "bad username") {
                alert("That username is already taken.");
            }
            else {
                // update the local storage user
                localStorage.setItem('user', JSON.stringify(username));
                navigate(`/profile/${username}`);
                // window.location.reload();
            }
        }).catch(err => {
            console.log(err);
        });

        handleExit();
    }

    // sets the dob state variable
    const handleBirthday = (newValue) => {
        // ignores the hours for accuracy
        var t = newValue.toJSON().slice(0, 10);
        var updatedDOB = (new Date(t.toString().replace(/-/g, '\/')));
        // set date in yyyy-mm-dd
        setDOB(updatedDOB.toJSON().slice(0, 10));
    }

    // add a "are you sure you want to leave?"
    return (
        <>
            <Box className="modal">
                <Box className="modal_content">
                    <span className="close" onClick={handleExit}>
                        <Button>
                            Exit
                        </Button>
                    </span>
                    <Box component="form" noValidate onSubmit={handleSubmit}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mt: "5px", display: { xs: 'none', md: 'flex' } }}
                        >
                            Update Profile Information
                        </Typography>
                        <InputLabel >Photo</InputLabel>

                        <Select
                            value={profile_img}
                            onChange={handleChange}
                            fullWidth
                            placeholder='Profile Pic'

                        >
                            {avatars.map((item, idx) => (
                                <MenuItem key={item.img} value={item.img}>

                                    <Grid container direction="row" alignItems="center">
                                        <img
                                            src={item.img}
                                            srcSet={item.img}
                                            alt={item.img}
                                            className='icon'
                                        />
                                        {item.animal}
                                    </Grid>
                                </MenuItem>
                            ))}

                        </Select>


                        {/* length of movie */}
                        <Box sx={{ mt: 5 }}>
                            <TextField
                                id="outlined-helperText"
                                label="Username"
                                defaultValue={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Box>
                        <Box sx={{ mt: 5 }}>
                            <TextField
                                id="outlined-helperText"
                                label="Email"
                                defaultValue={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </Box>
                        <Box sx={{ mt: 5 }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Birthday"
                                    name="dob"
                                    id="dob"
                                    autoComplete="dob"
                                    onChange={(newValue) => {
                                        handleBirthday(newValue);
                                    }}
                                    value={new Date(dob.toString().replace(/-/g, '\/'))}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box><br />
                    <Button type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box >
            </Box>
        </>
    );
}

const avatars = [
    {
        img: 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Dog-512.png',
        animal: 'Dog'
    },
    {
        img: 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Rabbit-512.png',
        animal: 'Rabbit'
    },
    {
        img: 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png',
        animal: 'Penguin'
    },
    {
        img: 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Panda-512.png',
        animal: 'Panda'
    },
    {
        img: 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Cat-512.png',
        animal: 'Cat'
    },
    {
        img: 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Pig-512.png',
        animal: 'Pig'
    },
    {
        img: 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Frog-512.png',
        animal: 'Frog'
    }
];