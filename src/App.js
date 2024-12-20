import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Album from "./pages/album/Album";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import Artist from "./pages/artist/Artist";
import Admin from "./pages/admin/Admin";
import CreateArtist from "./pages/admin/subpages/CreateArtist";
import Artists from "./pages/artists/Artists";
import Albums from "./pages/albums/Albums";
import CreateAlbum from "./pages/admin/subpages/CreateAlbum";
import EditAlbum from "./pages/admin/subpages/EditAlbum";
import EditArtist from "./pages/admin/subpages/EditArtist";
import Search from "./pages/search/Search";
import ReviewReports from "./pages/admin/subpages/ReviewReports";

function App() {
  return (
          <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/albums" element={<Albums />} />
              <Route path="/album/:id" element={<Album />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/artist/:id" element={<Artist />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/create-artist" element={<CreateArtist />} />
              <Route path="/admin/create-album" element={<CreateAlbum />} />
              <Route path="/admin/edit-album" element={<EditAlbum />} />
              <Route path="/admin/edit-artist" element={<EditArtist />} />
              <Route path="/admin/review-reports" element={<ReviewReports />} />
              <Route path="/search/:query" element={<Search />} />
          </Routes>
  );
}

export default App;
