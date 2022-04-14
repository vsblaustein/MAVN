import { experimental_sx } from '@mui/material';
import React, { useState } from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom';
import { useHistory, useNavigate } from 'react-router-dom';
import './CreateForm.css';


//ADD DATABASE CHECK    
function roomIdCreator() {

  //do {} while(code is in database)

  return Math.floor(100000 + Math.random() * 900000);


}

function CreateForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem('user'));

  // function to update state of name with
  // value enter by user in form
  const handleChange = (e) => {
    setName(e.target.value);
  }

  // function to update state of email with value
  // enter by user in form
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  // function to update state of password with
  // value enter by user in form
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  // function to update state of confirm password
  // with value enter by user in form
  const handleConfPasswordChange = (e) => {
    setConfPassword(e.target.value);
  }
  // below function will be called when user
  // click on submit button .
  const handleSubmit = (e) => {

    if (password != confPassword) {
      // if 'password' and 'confirm password'
      // does not match.
      alert("Passwords Don't Match");
    }
    else {
      // display alert box with user
      // 'name' and 'email' details .
      let newRoomId = roomIdCreator();

      //add check to make sure it doesnt currently exist in the database


      alert('A Movie Room was created with the name "' + name + '" and the 6 digit Code is ' + newRoomId);
      var currentdate = new Date();
      var datetime =
        currentdate.getFullYear() + "-"
        + (currentdate.getMonth() + 1) + "-"
        + currentdate.getDate() + " "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
      console.log(datetime);

      e.preventDefault();

      // insert into the database
      Axios.post('http://localhost:3001/addMovieRoom', {
        room_code: newRoomId,
        room_name: name,
        created: datetime,
        pass: password,
        master: currentUser,
      }).then((response) => {
        // gives a list of json objects
        console.log(response);
        console.log("Movie Room successfully created");
      }).catch(err => {
        console.log(err);
      }).finally(() => {

       Axios.post('http://localhost:3001/addPartOf', {
        user: currentUser,
        room_code: newRoomId,
        master: 1,

      }).then((response) => {
        // gives a list of json objects
        console.log(response);

      }).catch(err => {
        console.log(err);
      });
    });

      navigate("/movie%20room");
    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={(e) => { handleSubmit(e) }}>
          {/*when user submit the form , handleSubmit()
          function will be called .*/}
          <h2> Create a New Movie Room! </h2>
          <img src="https://cdn2.iconfinder.com/data/icons/scenarium-vol-4/128/030_group_team_meeting_crowd_people_employee-512.png" class="centered" />
          <label >
            Room Name:
          </label><br />
          <input type="text" value={name} required onChange={(e) => { handleChange(e) }} /><br />
          { /*when user write in name input box , handleChange()
                function will be called. */}

          <label>
            Password:
          </label><br />
          <input type="password" value={password} required onChange={(e) => { handlePasswordChange(e) }} /><br />
          {/* when user write in password input box ,
                    handlePasswordChange() function will be called.*/}
          <label>
            Confirm Password:
          </label><br />
          <input type="password" value={confPassword} required onChange={(e) => { handleConfPasswordChange(e) }} /><br />
          {/* when user write in confirm password  input box ,
                      handleConfPasswordChange() function will be called.*/}


          <input type="submit" value="Submit" />
        </form>

      </header>
    </div>
  );
}

export default CreateForm;