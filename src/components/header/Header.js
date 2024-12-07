import './Header.css';
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

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
                <Link className="navbar-brand" to="/">
                    <img src="/assets/logo.png" width="60" height="60"
                         className="d-inline-block align-top" alt=""/>
                </Link>
                <Link className="navbar-brand" to="/">RateTheRecord</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link text-white" to="/">Home</Link>
                        <Link className="nav-item nav-link text-white" to="/leaderboard">Leaderboard</Link>
                        <Link className="nav-item nav-link text-white" to="/artists">Artists</Link>
                        <Link className="nav-item nav-link text-white" to="/albums">Albums</Link>
                        <Link className="nav-item nav-link text-white" to="/admin">Admin</Link>
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
    );
}

export default Header;