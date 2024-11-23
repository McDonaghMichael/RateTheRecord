import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Album from "./pages/Album";
import Leaderboard from "./pages/leaderboard/Leaderboard";

function App() {
  return (
          <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/album/:id" element={<Album />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
  );
}

export default App;
