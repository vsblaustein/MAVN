import React from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import JoinPage from '../components/JoinPage';
import CreatePage from '../components/CreatePage';
import MovieRoomSlider from '../components/HomePage/MovieRoomSlider';
import { Routes } from "react-router-dom";

function Home() {
  const curr_user = JSON.parse(localStorage.getItem('user'));
  const [showJoin, setJoin] = React.useState(true);
  const[showCreate, setCreate] = React.useState(true);
  console.log("curent user after loading pages/index.js", curr_user);

  return (
    <React.Fragment>
      <ResponsiveAppBar currentUser={curr_user} />
      <Routes>

      </Routes>
      <MovieRoomSlider />
      {/* booleans hide buttons when other pop up is displayed */}
      {showJoin && <JoinPage setBtn={(val) => setCreate(val)}/>}
      {showCreate && <CreatePage setBtn={(val) => setJoin(val)}/>}

    </React.Fragment>

  );
};

export default Home;