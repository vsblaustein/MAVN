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
      {showJoin && <JoinPage setBtn={(val) => setCreate(val)}/>}
      {showCreate && <CreatePage  setBtn={(val) => setJoin(val)}/>}



    </React.Fragment>

  );
};

export default Home;

// import React from 'react';
// import ResponsiveAppBar from '../components/ResponsiveAppBar';
// import JoinPage from '../components/JoinPage';
// import CreatePage from '../components/CreatePage';
// import MovieRoomSlider from '../components/HomePage/MovieRoomSlider';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route
// } from "react-router-dom";
// import CreatePopUp from '../components/CreatePage/CreatePopUp';
// import JoinPopUp from '../components/JoinPage/JoinPopUp';
// import Button from '@mui/material/Button';


// function Home() {
//   const curr_user = JSON.parse(localStorage.getItem('user'));
//   const [showJoin, setJoin] = React.useState(false);
//   const [showCreate, setCreate] = React.useState(false);
//   console.log("curent user after loading pages/index.js", curr_user);

//   const toggleCreate = (v) => {
//     setCreate(v);
//     setJoin(false);
//   }

//   const toggleJoin = (v) => {
//     setCreate(false);
//     setJoin(v);
//   }

//   return (
//     <React.Fragment>
//       <ResponsiveAppBar currentUser={curr_user} />
//       <Routes>

//       </Routes>
//       <MovieRoomSlider />
//       <div class="centered">
//         <div className="btn" onClick={() => toggleCreate(true)} >
//           {!showJoin && <Button id="big-btn">Create Room</Button >}
//         </div>
//         {showCreate ? <CreatePopUp toggle={() => toggleCreate(false)} position="right center" /> : null}


//       </div>

//       <div class="centered">
//         <div className="btn" onClick={() => toggleJoin(true)} >
//           {!showCreate && <Button id="big-btn">Join Room</Button >}
//         </div>
//         {showJoin ? <JoinPopUp toggle={() => toggleJoin(false)} position="right center" /> : null}


//       </div>


//     </React.Fragment>

//   );
// };

// export default Home;