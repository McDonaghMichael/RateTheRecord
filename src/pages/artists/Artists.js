import {useEffect, useState} from 'react';
import axios from 'axios';

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

    console.log(artists);

    return (
        <>

            {artists.map((artist) => (
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{artist.name}</h5>
                                    <p className="card-text">{artist.description}</p>
                                    <a href={`/artist/${artist.id}`} className="btn btn-primary">Visit</a>
                                </div>
                            </div>
                        </div>
                </div>
            ))}
        </>
    )
        ;

}