import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Homepage.css';

export default function Homepage() {
    const [numberOneAlbum, setNumberOneAlbum] = useState([]);
    const [numberTwoAlbum, setNumberTwoAlbum] = useState([]);
    const [numberThreeAlbum, setNumberThreeAlbum] = useState([]);



    useEffect(() => {
        axios.get("http://localhost:4000/api/leaderboard")
            .then((response) => {
                setNumberOneAlbum(response.data[0]);
                setNumberTwoAlbum(response.data[1]);
                setNumberThreeAlbum(response.data[2]);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1 className="display-6 album-title">Top 3 Rated Albums</h1>
            <div id="albumCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
                <ol className="carousel-indicators">
                    <li data-bs-target="#albumCarousel" data-bs-slide-to="0" className="active"></li>
                    <li data-bs-target="#albumCarousel" data-bs-slide-to="1"></li>
                    <li data-bs-target="#albumCarousel" data-bs-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src={numberOneAlbum?.coverArt} alt={numberOneAlbum?.title}/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={numberTwoAlbum?.coverArt} alt={numberTwoAlbum?.title}/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={numberThreeAlbum?.coverArt} alt={numberThreeAlbum?.title}/>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#albumCarousel" role="button" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </a>
                <a className="carousel-control-next" href="#albumCarousel" role="button" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </a>
            </div>

        </div>
    );
}
