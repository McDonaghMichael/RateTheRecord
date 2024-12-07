import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Homepage.css';
import {Link} from "react-router-dom";

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
            <div className="jumbotron jumbotron-fluid mb-5 text-center">
                <div className="container">
                    <h1 className="display-4">Rate The Record</h1>
                    <p className="lead">Welcome to <em>RateTheRecord</em>, the number #1 destination for reviewing your favourite albums! Review all the albums from your favourite artists to help them gain dominance on the leaderboard.</p>
                </div>
            </div>
            <h1 className="display-6 album-title">Top 3 Rated Albums</h1>
            <p className="text-center lead">Dynamically updates whenever a new album enters the top 3</p>
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
                <Link className="carousel-control-prev" to="#albumCarousel" role="button" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </Link>
                <Link className="carousel-control-next" to="#albumCarousel" role="button" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </Link>
            </div>

        </div>
    );
}
