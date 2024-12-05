import { useEffect, useState } from 'react';
import axios from 'axios';
import './Search.css';
import {useParams} from "react-router-dom";

export default function Search() {

    let { query } = useParams();

    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);


    useEffect(() => {
        const fetchQuery = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/search/" + query);

                const artists = response.data.artists || [];
                const albums = response.data.albums || [];

                setArtists(artists);
                setAlbums(albums);
            } catch (error) {
                console.error("Error fetching query data:", error);
            }
        };

        fetchQuery();
    }, [query]);


    return (
        <div>
            <h3>Search Results: {query}</h3>
            {albums.length > 0 && (
                <div className="container">
                    <h4>Albums</h4>
                    <div className="row">
                        {albums.map((album) => (
                            <div className="col-md-4 mb-4" key={album.id}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">{album.title}</h5>
                                        <img className="albumArt img-fluid" src={album.coverArt} alt={album.title} />
                                        <p className="card-text">{album.description}</p>
                                        <a href={`/album/${album._id}`} className="btn btn-primary">Visit</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {artists.length > 0 && (
                <>
                    <div className="container">
                        <h4>Artists</h4>
                        <div className="row">
                            {artists.map((artist) => (
                                <div className="col-md-4 mb-4" key={artist.id}>
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h5 className="card-title">{artist.name}</h5>
                                            <img className="artistArt img-fluid" src={artist.profileImage}
                                                 alt={artist.name}/>
                                            <p className="card-text">{artist.description}</p>
                                            <a href={`/artist/${artist._id}`} className="btn btn-primary">Visit</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
