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
        <>
            {albums.map((album) => (
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{album.title}</h5>
                                <img className="albumArt" src={album.cover_art}></img>
                                <p className="card-text">{album.description}</p>
                                <a href={`/album/${album.id}`} className="btn btn-primary">Visit</a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
        ;

}