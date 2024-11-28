import './Header.css';

const Header = () => {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Project</a>
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
                </div>
            </nav>
        </>
    )
}

export default Header;