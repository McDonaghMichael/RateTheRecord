import {useEffect, useState} from 'react';
import axios from 'axios';
import './Albums.css';
import {Link} from "react-router-dom";

export default function Albums() {

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/albums")
            .then((response) => {
                setAlbums(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    console.log(albums);

    return (
        <>
            <h1 className="text-center mt-5 mb-5">Albums</h1>
            <div className="container">
                <div className="row">
                    {albums.map((album, index) => (
                        <div className="col-md-4 mb-4" key={album.id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{album.title}</h5>
                                    <img className="albumArt img-fluid" src={album.coverArt} alt={album.title}/>
                                    <p className="card-text">{album.description}</p>
                                    <Link to={`/album/${album._id}`} className="btn btn-primary">Visit</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
        ;

}