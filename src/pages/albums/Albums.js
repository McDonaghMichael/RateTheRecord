import {useEffect, useState} from 'react';
import axios from 'axios';
import './Albums.css';

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
        <div className="container">
            <div className="row">
                {albums.map((album, index) => (
                    <div className="col-md-4 mb-4" key={album.id}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{album.title}</h5>
                                <img className="albumArt img-fluid" src={album.cover_art} alt={album.title} />
                                <p className="card-text">{album.description}</p>
                                <a href={`/album/${album._id}`} className="btn btn-primary">Visit</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
    ;

}