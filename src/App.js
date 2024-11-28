import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Album from "./pages/album/Album";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import Artist from "./pages/artist/Artist";
import Admin from "./pages/admin/Admin";
import CreateArtist from "./pages/admin/subpages/CreateArtist";

function App() {
  return (
          <Routes>

              <Route path="/" element={<Homepage />} />
              <Route path="/album/:id" element={<Album />} />
              <Route path="/artist/:id" element={<Artist />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/create-artist" element={<CreateArtist />} />
          </Routes>
  );
}

export default App;
