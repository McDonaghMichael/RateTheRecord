import './Header.css';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Header = () => {

    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search/${searchQuery}`);
        } else {
            alert("Please enter a search query.");
        }
    };


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">RateTheRecord</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link text-white" href="/">Home</a>
                        <a className="nav-item nav-link text-white" href="/leaderboard">Leaderboard</a>
                        <a className="nav-item nav-link text-white" href="/artists">Artists</a>
                        <a className="nav-item nav-link text-white" href="/albums">Albums</a>
                    </div>
                    <form className="form my-2 my-lg-0 ms-auto d-flex">
                        <input
                            className="form-control me-2"
                            type="search"
                            value={searchQuery}
                            placeholder="Search"
                            aria-label="Search"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            className="btn btn-outline-success my-2 my-sm-0"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Search
                        </button>
                    </form>
                </div>
            </nav>
        </>
    )
}

export default Header;