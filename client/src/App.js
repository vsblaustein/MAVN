import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from './pages';

function App() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route exact path='/' exact element={<Home />} />
        <Route exact path='/home' exact element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
