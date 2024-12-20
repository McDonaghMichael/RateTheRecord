import { useEffect, useState } from 'react';
import axios from 'axios';
import './Leaderboard.css';
import {Link} from "react-router-dom";

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/leaderboard")
            .then((response) => {
                setLeaderboard(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <table className="table">
                <thead className="thead-light">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Artist</th>
                    <th scope="col">Title</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Year</th>
                    <th scope="col">Reviews</th>
                </tr>
                </thead>

                {leaderboard.length > 0 && (
                    <tbody>
                    {leaderboard.map((album, index) => (
                        <tr key={album._id}>
                            <td>{index + 1}</td>
                            <td>
                                {album.artistInfo && album.artistInfo.length > 0 ? (
                                    <Link className="artist-link" to={`/artist/${album.artist}`}>
                                        {album.artistInfo[0].name} {}
                                    </Link>
                                ) : (
                                    "Artist Not Available"
                                )}

                            </td>
                            <td>
                                {album.coverArt && (
                                    <img src={album.coverArt} alt={album.title} />
                                )}
                                <Link className="album-link" to={`/album/${album._id}`}>{album.title}</Link>
                            </td>
                            <td>{album.averageRating != null ? album.averageRating : 0}</td>
                            <td>{album.year}</td>
                            <td>{album.ratingCount}</td>
                        </tr>
                    ))}
                    </tbody>
                )}
            </table>
        </>
    );
}
