import React, {useState} from 'react';
import './PopUp.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
import {useHistory, useNavigate} from 'react-router-dom';

function JoinForm() {
  const [name , setName] = useState('');
  const navigate = useNavigate()


  const handleChange =(e)=>{
    setName(e.target.value);
  }

  const handleClick = (e) => {
   this.props.toggle();
  };

  const handleExit = (e) => {
    this.props.toggle();
};


  const handleSubmit=(e)=>{
      
      //DATABASE WORK
    //if code is valid -> go through
    if(name == "MAVN"){
      alert('You Joined ' + name + '!' );
      e.preventDefault();
    navigate("/movie%20room");
    }
    else{
      alert("Room Does not Exist");
    }

  }





  return (
  
    <div className="App">
    <header className="App-header">
    <form onSubmit={(e) => {handleSubmit(e)}}>
        


    <h2> Enter Room Id </h2>
                <div>
                  <label>
                    Room Id:
                    <input type="text" name="name" required onChange={(e) => {handleChange(e)}}/>
                  </label>

                        <input type="submit" value="Submit" />

            
                    
                </div>
                
        
    </form>



    </header>
    </div>
  );
 }

export default JoinForm;