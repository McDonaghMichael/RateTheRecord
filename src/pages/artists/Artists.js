import {useEffect, useState} from 'react';
import axios from 'axios';
import './Artists.css';
import {Link} from "react-router-dom";

export default function Artists(){

    const [artists, setArtists] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/artists")
            .then((response) => {
                setArtists(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <>
            <h1 className="text-center mt-5 mb-5">Artists</h1>
            <div className="container">
                <div className="row">
                    {artists.map((artist) => (
                        <div className="col-md-4 mb-4" key={artist.id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{artist.name}</h5>
                                    <img className="artistArt img-fluid" src={artist.profileImage} alt={artist.name}/>
                                    <p className="card-text">{artist.description}</p>
                                    <Link to={`/artist/${artist._id}`} className="btn btn-primary">Visit</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );


}