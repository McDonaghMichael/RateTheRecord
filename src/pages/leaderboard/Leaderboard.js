import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Leaderboard.css';

export default function Leaderboard(){

    const [leaderboard, setLeaderboard] = useState([]);
    let leaderboardRow = 1;

    useEffect(() => {
        axios.get("http://localhost:4000/api/leaderboard")
            .then((response) => {
                setLeaderboard(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    console.log(leaderboard);

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
                    {leaderboard.map((album) => (
                        <tr>
                            {leaderboardRow++}

                            <td><a href={`/artist/${album.artist}`}>{album.artistInfo[0].name}</a>
                            </td>
                            <td><img src={album.cover_art}></img> <a href={`/album/${album.id}`}>{album.title}</a>
                            </td>
                            <td>{album.averageRating}</td>
                            <td>{album.year}</td>
                            <td>{album.ratingCount}</td>
                        </tr>
                    ))}
                    </tbody>

                )
                }
            </table>
</>
)
    ;

}