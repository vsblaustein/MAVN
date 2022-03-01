import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignIn from './components/SignInPage';
import Home from './pages';
import Preferences from './components/PreferencesPage';
import SignUpPage from './components/SignUpPage';
import BrowseMoviesPage from './components/BrowseMoviesPage';
import MovieRoomPage from './components/MovieRoomPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' exact element={<SignIn />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/home/my%20preferences" element={<Preferences />} />
        <Route path="/home/browse%20movies" element ={<BrowseMoviesPage/>}/>
        <Route path='/logout' element={<SignIn />} />
        <Route path="/home/movie%20room" element={<MovieRoomPage/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
