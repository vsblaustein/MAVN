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
import MovieRoomPage from './components/MovieRoomPage';
import JoinPage from './components/JoinPage';
import ProfilePage from './components/ProfilePage';
import CreatePage from './components/CreatePage';
import SearchMoviesPage from './components/SearchMoviesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<SignIn />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/my%20preferences" element={<Preferences />} />
        <Route path='/logout' element={<SignIn />} />
        <Route path="/movie%20room" element={<MovieRoomPage/>}/>
        <Route path="/profile/:user" element={<ProfilePage params={window.location.href.split('/')[4]}/>}/>
        {/* <Route path="/myprofile/:user" element={<ProfilePage />}/> */}

        <Route path="/create" element={<CreatePage/>}/>
        <Route path="/join" element={<JoinPage/>}/>
        <Route path="/search%20movies" element ={<SearchMoviesPage/>}/>
        <Route path="/movie%20room/:code" element={<MovieRoomPage/>}/> 
      </Routes>
    </Router>
    
  );
}

export default App;