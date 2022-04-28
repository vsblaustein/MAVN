import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateForm.css';


//ADD DATABASE CHECK    
function roomIdCreator() {
  //add check to see if in db
  return Math.floor(100000 + Math.random() * 900000);
}

function CreateForm() {
  const [name, setName] = useState('');
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

  // functions  to update state of password with form val

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleConfPasswordChange = (e) => {
    setConfPassword(e.target.value);
  }

  // submit form and write to db
  const handleSubmit = async (e) => {

    if (password !== confPassword) {
      // if 'password' and 'confirm password'
      alert("Passwords Don't Match");
    }
    else {
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

      await Axios.post('http://localhost:3001/addMovieRoom', {
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
      });

      await Axios.post('http://localhost:3001/addPartOf', {
        user: currentUser,
        room_code: newRoomId,
        master: 1,

      }).then((response) => {
        // gives a list of json objects
        console.log(response);

      }).catch(err => {
        console.log(err);
      });


      navigate(`/movie%20room/${newRoomId}`);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={(e) => { handleSubmit(e) }}>
          {/*when user submit the form , handleSubmit()
          function will be called .*/}
          <h2> Create a New Movie Room! </h2>
          <img className="imgSize"
            alt=''
            src="https://cdn2.iconfinder.com/data/icons/scenarium-vol-4/128/030_group_team_meeting_crowd_people_employee-512.png" class="centered" />
          <label >
            Room Name:
          </label><br />
          <input type="text" value={name} required onChange={(e) => { handleChange(e) }} /><br />
          <label>
            Password:
          </label><br />
          <input type="password" value={password} required onChange={(e) => { handlePasswordChange(e) }} /><br />
          <label>
            Confirm Password:
          </label><br />
          <input type="password" value={confPassword} required onChange={(e) => { handleConfPasswordChange(e) }} /><br />
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default CreateForm;