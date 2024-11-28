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
                <a href={`/artist/${artist.id}`}><p>{artist.name}</p></a>
            ))}
        </>
    )
        ;

}