import React, { useState } from 'react';
import './PopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
import { useHistory, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import TextField from '@mui/material/TextField';

function JoinForm() {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [dbPass, setDBPass] = React.useState('');
  const navigate = useNavigate()


  const handleSubmit = (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log("beginning axios.get")
    const room_code = data.get('room_code');
    const pass = data.get('password');

    console.log("code: " + room_code + " pass: " + pass);

    // check password
    Axios.get('http://localhost:3001/getPassword', {
      params: { roomCode: room_code }
    }
    ).then((response) => {
      console.log("password for " + room_code + " is: " + response.data[0].password);
      setDBPass(response.data[0].password);

      // check that the passwords match
      if (dbPass !== pass) {
        alert("Incorrect pass word for " + room_code);
      }
      else {

        // adds user to the part of table room
        Axios.post('http://localhost:3001/addPartOf', {
          user: currentUser,
          room_code: room_code,
          master: 0,

        }).then((response) => {
          // gives a list of json objects
          console.log(response);
          //navigate("/movie%20room"); + 6 digit code
          // NEED TO CATCH THIS ERROR
        }).catch(err => {
          if (err.code === 'ER_DUP_ENTRY'){
            alert("Already joined room.");
          }
          console.log(err);
        });

      }
    // alert user of incorrect room
    }).catch(err => {
      alert("No room with code " + room_code + " exists.");
      console.log(err);
    });

  }

  return (

    <Box className="App">

      <Typography component="h1" variant="h5">
        Enter Room:
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          width='100vw'
          id="room_code"
          label="Room Code"
          name="room_code"
          autoFocus
        />
        <br />
        <TextField
          margin="normal"
          required
          width='100vw'
          name="password"
          label="Room Password"
          type="password"
          id="password"
        />
        <br />
        <Button
          type="submit"
          widht='50vw'
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Join
        </Button>
      </Box>

    </Box>
  );
}

export default JoinForm;