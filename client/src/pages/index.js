import React from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import JoinPage from '../components/JoinPage';
import CreatePage from '../components/CreatePage';
import Movies from '../components/BrowseMoviesPage/Movies';
import MovieRoomSlider from '../components/HomePage/MovieRoomSlider';


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import CreateForm from '../components/CreatePage/CreateForm';
  
function Home() {
  return (
  <React.Fragment>
    <ResponsiveAppBar />
    <Routes>
      
    </Routes>
    <MovieRoomSlider />
    <JoinPage />
    <CreatePage />
    
    

  </React.Fragment>
    
  );
};
  
export default Home;