import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from "./pages/Homepage";



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<Homepage />} />
            </Routes>
        </Router>
    );
}

export default App;