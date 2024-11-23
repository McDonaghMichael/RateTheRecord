import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from "./pages/Homepage";
import Album from "./pages/Album";



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/album/:id" element={<Album />} />
            </Routes>
        </Router>
    );
}

export default App;