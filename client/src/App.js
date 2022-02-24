import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignIn from './components/SignInPage';
import Home from './pages';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' exact element={<SignIn />} />
        <Route path="/home/*" element={<Home />} />
      </Routes>
    </Router>
    
  );
}

export default App;
