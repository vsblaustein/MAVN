import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignIn from './components/SignInPage';
import Home from './pages';
import SignUpPage from './components/SignUpPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' exact element={<SignIn />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home/*" element={<Home />} />
      </Routes>
    </Router>
    
  );
}

export default App;
