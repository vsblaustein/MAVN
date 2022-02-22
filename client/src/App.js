import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
      <ResponsiveAppBar />
    
    </Router>
  );
}

export default App;
