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

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' exact element={<SignIn />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/preferences" element={<Preferences />} />
      </Routes>
    </Router>
  );
}

export default App;
