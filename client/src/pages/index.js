import React from 'react';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
  
function Home() {
  return (
    <React.Fragment>
      <Router>
        <ResponsiveAppBar />
        <Routes>
          
        </Routes>
      </Router>
    </React.Fragment>
  );
};
  
export default Home;