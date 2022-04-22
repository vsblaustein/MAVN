import React from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import JoinPage from '../components/JoinPage';
import CreatePage from '../components/CreatePage';
import MovieRoomSlider from '../components/HomePage/MovieRoomSlider';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import CreateForm from '../components/CreatePage/CreateForm';
  



function Home() {

  const curr_user = JSON.parse(localStorage.getItem('user'));
  console.log("curent user after loading pages/index.js", curr_user);

  return (
  <React.Fragment>
    <ResponsiveAppBar currentUser = {curr_user} />
    <Routes>
      
    </Routes>
    <MovieRoomSlider />
    <JoinPage />
    <CreatePage />
    
    

  </React.Fragment>
    
  );
};
  
export default Home;