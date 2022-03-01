import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from './pages';
import Preferences from './components/PreferencesPage';
import SignIn from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import BrowseMoviesPage from './components/BrowseMoviesPage';
import MovieRoomPage from './components/MovieRoomPage';
import JoinPage from './components/JoinPage';
import AccountPage from './components/AccountPage';
import ProfilePage from './components/ProfilePage';
import CreatePage from './components/CreatePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' exact element={<SignIn />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/my%20preferences" element={<Preferences />} />
        <Route path="browse%20movies" element ={<BrowseMoviesPage/>}/>
        <Route path='/logout' element={<SignIn />} />
        <Route path="/movie%20room" element={<MovieRoomPage/>}/>
        <Route path="/join" element={<JoinPage/>}/>
        <Route path="/account" element={<AccountPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/create" element={<CreatePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
